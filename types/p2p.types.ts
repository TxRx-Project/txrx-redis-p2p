import { Span } from "@txrx/otel-instrumentation";
import { ConsumeItem } from "@txrx/redis-consumer";

export type P2PMapping = {
    [key:string]: string;
};

export type PeerShards = {
    [key:string]: P2PMapping;
};

export type P2PHandlers = {
    [key:string]: (item: ConsumeItem, parent: Span) => Promise<void>;
};

export enum P2PMode {
    BROADCASTER,
    LISTENER,
};

export const SHARD_GLUE = ',';


export type P2PConfiguration = {
    peer: string;
    redis: {
        connstring: string;
        stream: {
            name: string;
            maxlen: number;
        };
    };
};

/**
 * A proxy symbol for the for {@link P2PMapping}.
 */
export const P2PMapping = Symbol('P2PMapping');

/**
 * A proxy symbol for the for {@link PeerShards}.
 */
export const PeerShards = Symbol('PeerShards');

/**
 * A proxy symbol for the for {@link P2PHandlers}.
 */
export const P2PHandlers = Symbol('P2PHandlers');

/**
 * A proxy symbol for the for {@link P2PConfiguration}.
 */
export const P2PConfiguration = Symbol('P2PConfiguration');
