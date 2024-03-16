import { Subscription } from "rxjs";
import { P2PMapping } from "../types/p2p.types";
import P2P from "./p2p";

const subscribe = async (fn: (mapping: P2PMapping) => Promise<void>): Promise<Subscription> => {
    const p2p = await P2P.get();

    return p2p.subscribe(fn);
};

const resolve = async(event: string): Promise<string | null> => {
    const p2p = await P2P.get();

    return p2p.resolve(event);
};

export {
    resolve, 
    subscribe
};
