import { isAsyncFunction } from 'util/types';
import Configuration from '../../src/configuration';
import Registry from './../../src/registry';
import { Instrumentation, TELEMETRY } from '@txrx/otel-instrumentation';

jest.mock('ioredis', () => require('ioredis-mock'));

describe('The Registry class', () => {
    beforeEach(() => {
        Configuration.set({
            peer: 'test',
            redis: {
                connstring: 'redis://127.0.0.1',
                stream: {
                    name: 'p2p',
                    maxlen: 1000,
                },
            },
        });
    });

    it('should be useless without configuration', async() => {
        Configuration.destroy();
        await expect(Registry.get()).rejects.toEqual(new Error('P2P not configured, did you forget to run initialize?'));
    });

    it('should behave as a singleton', async() => {
        const registry = await Registry.get();

        expect(registry).toBeInstanceOf(Registry);

        const registry2 = await Registry.get();

        expect(registry2).toBe(registry);

        const mappings = registry.get();

        expect(registry2.get()).toEqual(mappings);

        await expect(Registry.destroy()).resolves.toEqual(mappings);
        
        expect(registry2.get()).toEqual(mappings);

        const registry3 = await Registry.get();

        expect(registry3).not.toBe(registry2);
    });

    it('should load handlers from its directory', async() => {
        const registry = await Registry.get();
        const mappings = registry.get();
        const keys = Object.keys(mappings).sort();

        expect(keys).toEqual([
            'share',
            'init',
            'hello',
        ].sort());

        const fold = Object.values(mappings).reduce((prev: boolean, curr) => {
            const isAsyncFunction = curr.constructor.toString().indexOf('function AsyncFunction()') >= 0;
            return prev && typeof curr === 'function' && isAsyncFunction;
        }, true);

        expect(fold).toBeTruthy();
    });

    it('executes the computations defined by the handlers', async() => {
        const registry = await Registry.get();
        const mappings = registry.get();
        const keys = Object.keys(mappings);

        for await(const key of keys){
            mappings[key] = jest.fn().mockImplementation(async () => {});

            const fn = registry.compute(key);
            const item = {
                id: '0-0',
                stream: 'p2p',
                payload: {
                    foo: 'bar',
                },
            };
            const span = Instrumentation.service({
                serviceName: 'p2p',
                serviceVersion: '1.0.0',
                mode: TELEMETRY.CONSOLE,
            });

            expect(fn(item, span)).resolves.toBeUndefined();

            expect(mappings[key]).toHaveBeenCalledWith(item, span);
        }
    });
});
