import { Streamer } from "@txrx/redis-streamer";
import { IHandler } from "./interfaces/IHandler";

export default abstract class Handler implements IHandler {
    protected streamer: Streamer;

    public constructor(url: string) {
        this.streamer = new Streamer(url);
    }
}
