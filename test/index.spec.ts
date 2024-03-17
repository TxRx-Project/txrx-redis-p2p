import * as Index from '../index';
import { P2PBroadcaster, P2PListener, P2PShare } from '../src/decorators/p2p.decorators';
import * as Types from '../types/p2p.types';

test('index exports', () => {
    expect(Index.P2PListener).toBe(P2PListener);
    expect(Index.P2PBroadcaster).toBe(P2PBroadcaster);
    expect(Index.P2PShare).toBe(P2PShare);
    expect(Index.P2PMapping).toBe(Types.P2PMapping);
    expect(Index.PeerShards).toBe(Types.PeerShards);
    expect(Index.P2PHandlers).toBe(Types.P2PHandlers);
    expect(Index.P2PMode).toBe(Types.P2PMode);
    expect(Index.P2PConfiguration).toBe(Types.P2PConfiguration);
    expect(Index.SHARD_GLUE).toBe(Types.SHARD_GLUE);
});

test('index scope', () => {
    expect(Object.keys(Index).sort()).toEqual([
        'P2PListener',
        'P2PShare',
        'P2PConfiguration',
        'P2PBroadcaster',
        'P2PHandlers',
        'P2PMapping',
        'PeerShards',
        'P2PMode',
        'P2P',
        'SHARD_GLUE',
    ].sort())
});
