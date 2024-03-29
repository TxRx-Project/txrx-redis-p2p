import { P2PMapping, SHARD_GLUE } from "../types/p2p.types";

export default class Shard {
    private static shard: Shard;
    private constructor() {}
    private mapping: P2PMapping = {};

    public static async get(): Promise<Shard> {
        if (!Shard.shard) {
            Shard.shard = new Shard();
        }

        return Shard.shard;
    }

    public add(event: string, stream: string): void {
        this.mapping[event] = stream;
    }

    public del(event: string): void {
        delete this.mapping[event];
    }

    public get(): P2PMapping {
        return this.mapping;
    }

    public serialize(): string {
        const shard = [];

        for(const event of Object.keys(this.mapping).sort()){
            shard.push(event, this.mapping[event]);
        }

        return shard.join(SHARD_GLUE);
    }

    public static unserialize(shard: string): P2PMapping {
        const chunks = shard.split(SHARD_GLUE) as string[];

        if (chunks.length % 2 !== 0) {
            return {};
        }

        return Object.fromEntries(chunks.flatMap((_, i, a) => {
            return i % 2 ? [] : [a.slice(i, i + 2)];
        })) as P2PMapping;
    }

    public static async destroy(): Promise<P2PMapping> {
        const shard = await Shard.get();
        const mapping = shard.get();
        
        shard.mapping = {};
        Shard.shard = undefined;

        return mapping;
    }
}