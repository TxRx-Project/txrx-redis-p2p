import Shard from "../../src/shard";

describe('The Shard Class', () => {
    it('behaves as a singleton instance', async() => {
        const shard = await Shard.get();

        expect(shard).toBeInstanceOf(Shard);

        const shard2 = await Shard.get();

        expect(shard2).toBeInstanceOf(Shard);

        expect(shard2).toBe(shard);

        shard.add('test', 'stream');

        expect(shard2.get()).toEqual({
            test: 'stream',
        });

        shard2.add('event', 'test');

        await expect(Shard.destroy()).resolves.toEqual({
            event: 'test',
            test: 'stream',
        });

        expect(shard2.get()).toEqual({});

        const shard3 = await Shard.get();

        expect(shard3).not.toBe(shard2);

        expect(shard3.get()).toEqual({});
    });

    it('can manipulate the underlying mapping', async() => {
        const shard = await Shard.get();

        shard.add('test1', 'stream1');
        shard.add('test2', 'stream2');
        shard.add('test3', 'stream3');

        expect(shard.get()).toEqual({
            test1: 'stream1',
            test2: 'stream2',
            test3: 'stream3',
        });

        shard.del('test2');

        expect(shard.get()).toEqual({
            test1: 'stream1',
            test3: 'stream3',
        });

        shard.del('test1');
        shard.del('test3');

        expect(shard.get()).toEqual({});
    })
    
    it('has serialization and deserialization capabilities', async() => {
        const shard = await Shard.get();

        shard.add('test1', 'stream1');
        shard.add('test2', 'stream2');
        shard.add('test3', 'stream3');

        const serialized = shard.serialize();

        const mapping = shard.get();

        expect(serialized).toBe('test1,stream1,test2,stream2,test3,stream3');

        expect(Shard.unserialize(serialized)).toEqual(mapping);

        await Shard.destroy();

        expect(shard.get()).toEqual({});

        expect(shard.serialize()).toBe('');

        expect(Shard.unserialize('')).toEqual({});
    });
});
