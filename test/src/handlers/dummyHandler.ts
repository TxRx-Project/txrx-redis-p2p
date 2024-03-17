import Handler from './../../../src/handler';
import { Streamer } from '@txrx/redis-streamer';

export default class DummyHandler extends Handler {
    public constructor(url: string) {
        super(url);
    }

    public getStreamer(): Streamer {
        return this.streamer;
    }
}
