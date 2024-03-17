import { P2PConfiguration } from "../types/p2p.types";

export default class Configuration {
    private static config: P2PConfiguration | null = null;

    public static destroy(): P2PConfiguration | null {
        const config = Configuration.get();

        Configuration.config = null;

        return config;
    }

    public static get(): P2PConfiguration | null {
        return Configuration.config ?? null;
    }

    public static peer(): string {
        const config = Configuration.get();
        
        if (config) {
            if (config.peer) {
                return config.peer;
            }
        }

        throw new Error('P2P not configured, did you forget to run initialize?');
    }

    public static redisConnstring(): string {
        const config = Configuration.get();
        
        if (config) {
            if (config.redis) {
                if (config.redis.connstring) {
                    return config.redis.connstring;
                }
            }
        }

        throw new Error('P2P not configured, did you forget to run initialize?');
    }

    public static redisStreamName(): string {
        const config = Configuration.get();
        
        if (config) {
            if (config.redis) {
                if (config.redis.stream) {
                    if (config.redis.stream.name) {
                        return config.redis.stream.name;
                    }
                }
            }
        }

        throw new Error('P2P not configured, did you forget to run initialize?');
    }

    public static redisStreamMaxlen(): number {
        const config = Configuration.get();
        
        if (config) {
            if (config.redis) {
                if (config.redis.stream) {
                    if (config.redis.stream.maxlen) {
                        return config.redis.stream.maxlen;
                    }
                }
            }
        }

        throw new Error('P2P not configured, did you forget to run initialize?');
    }

    public static set(config: P2PConfiguration): void {
        Configuration.config = config;
    }
}
