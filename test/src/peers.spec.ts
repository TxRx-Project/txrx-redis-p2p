import Peers from "../../src/peers";

describe('The Peers class', () => {
    it('behaves as a proxy class', async() => {
        expect(Peers.get('test')).toBeNull();
        
        const mapping = {
            test1: 'stream1',
            test2: 'stream2',
            test3: 'stream3',
        };

        Peers.set('test', mapping);

        expect(Peers.get('test')).toEqual(mapping);
        expect(Peers.get('test2')).toBeNull();

        const mapping2 = {
            foo1: 'stream1',
            foo2: 'stream2',
            foo3: 'stream3',
        };

        Peers.set('foo', mapping2);

        expect(Peers.get('test')).toEqual(mapping);
        expect(Peers.get('foo')).toEqual(mapping2);
        expect(Peers.get('test2')).toBeNull();
    }); 
});