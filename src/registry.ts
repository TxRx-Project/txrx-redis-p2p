import { ConsumeItem } from "@txrx/redis-consumer";
import { Span } from "@txrx/otel-instrumentation";
import { P2PHandlers } from "../types/p2p.types";
import * as path from 'path';
import { promises as fsp } from 'fs';
import Handler from "./handler";
import Configuration from "./configuration";

export default class Registry {
    private static registry: Registry;
    private mapping: P2PHandlers = {};
    private handlers: Handler[] = [];
    private url: string;

    private constructor(url: string){ 
        this.url = url;
    }

    public static async get(): Promise<Registry> {
        if (!Registry.registry) {
            const redisConnstring = Configuration.redisConnstring();
            Registry.registry = new Registry(redisConnstring);
            await Registry.registry.load();
        }

        return Registry.registry;
    }

    private async load(): Promise<void> {
        const handlersDirectory = path.join(__dirname, 'handlers');

        const files = await fsp.readdir(handlersDirectory);

        for await (const file of files) {
            if (/\.(j|t)s$/.test(file)) {
                const handlerModule = await import(path.join(__dirname, 'handlers', file));
                this.handlers.push(new handlerModule.default(this.url));
            }
        }
    }

    public add(event: string, handler: (item: ConsumeItem, parent: Span) => Promise<void>): void {
        this.mapping[event] = handler;
    }

    public compute(event: string): (item: ConsumeItem, parent: Span) => Promise<void> | null {
        return this.mapping[event];
    }

    public get(): P2PHandlers {
        return this.mapping;
    }

    public static async destroy(): Promise<P2PHandlers> {
        const registry = await Registry.get();
        const mapping = registry.get();

        Registry.registry = null;

        return mapping;
    }
}
