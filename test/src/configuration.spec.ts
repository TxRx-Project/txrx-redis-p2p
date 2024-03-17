import Configuration from './../../src/configuration';

describe('The Configuration class', () => {
    beforeEach(() => { 
        Configuration.destroy();

        expect(Configuration.get()).toBeNull();
    });

    it('behaves as a proxy class', async() => {
        expect(Configuration.get()).toBeNull();

        const config = {
            peer: 'peer',
            redis: {
                connstring: 'redis://127.0.0.1',
                stream: {
                    name: 'p2p',
                    maxlen: 20000,
                },
            },
        };

        Configuration.set(config);

        expect(Configuration.get()).toEqual(config);

        const config2 = {
            peer: 'peer2',
            redis: {
                connstring: 'redis://127.0.0.2',
                stream: {
                    name: 'p2p-shared',
                    maxlen: 1000,
                },
            },
        };

        Configuration.set(config2);

        expect(Configuration.get()).toEqual(config2);
    });

    it('should provide accessors to the configuaration values', async() => {

        const config = {
            peer: 'peer',
            redis: {
                connstring: 'redis://127.0.0.1',
                stream: {
                    name: 'p2p',
                    maxlen: 20000,
                },
            },
        };

        Configuration.set(config);

        expect(Configuration.peer()).toBe(config.peer);

        expect(Configuration.redisConnstring()).toBe(config.redis.connstring);
   
        expect(Configuration.redisStreamMaxlen()).toBe(config.redis.stream.maxlen);
   
        expect(Configuration.redisStreamName()).toBe(config.redis.stream.name);
    });

    it('should throw while not configured', async() => {
        expect(Configuration.get()).toBeNull();

        expect(Configuration.peer).toThrow(new Error('P2P not configured, did you forget to run initialize?'));

        expect(Configuration.redisConnstring).toThrow(new Error('P2P not configured, did you forget to run initialize?'));
   
        expect(Configuration.redisStreamMaxlen).toThrow(new Error('P2P not configured, did you forget to run initialize?'));

        expect(Configuration.redisStreamName).toThrow(new Error('P2P not configured, did you forget to run initialize?'));
    });
});
