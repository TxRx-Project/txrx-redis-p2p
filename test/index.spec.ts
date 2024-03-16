import * as Index from '../index';
import { P2PBroadcaster, P2PListener, P2PShare } from '../src/decorators/p2p.decorators';

test('index exports', () => {
    expect(typeof Index.P2PListener).toBe(typeof P2PListener);
    expect(typeof Index.P2PBroadcaster).toBe(typeof P2PBroadcaster);
    expect(typeof Index.P2PShare).toBe(typeof P2PShare);
    expect(typeof Index.P2PMapping).toBe(typeof Index.P2PMapping);
    expect(typeof Index.PeerShards).toBe(typeof Index.PeerShards);
    expect(typeof Index.P2PHandlers).toBe(typeof Index.P2PHandlers);
    expect(typeof Index.P2PMode).toBe(typeof Index.P2PMode);
});

test('index scope', () => {
    expect(Object.keys(Index).sort()).toEqual([
        'P2PListener',
        'P2PShare',
        'P2PBroadcaster',
        'subscribe',
        'resolve',
        'P2PHandlers',
        'P2PMapping',
        'PeerShards',
        'P2PMode',
    ].sort())
});
