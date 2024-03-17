import { Subscription } from "rxjs";
import { P2PConfiguration, P2PMapping } from "../types/p2p.types";
import P2P from "./p2p";
import Configuration from "./configuration";

export default class Facade {
    public async subscribe(fn: (mapping: P2PMapping) => Promise<void>): Promise<Subscription> {
        const p2p = await P2P.get();
    
        return p2p.subscribe(fn);
    }
    
    public async resolve(event: string): Promise<string | null> {
        const p2p = await P2P.get();
    
        return p2p.resolve(event);
    }

    public async initialize(config: P2PConfiguration): Promise<void> {
        Configuration.set(config);
    }
};
