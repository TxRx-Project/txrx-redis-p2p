import { Streamer } from "@txrx/redis-streamer";
import DummyHandler from "./handlers/dummyHandler";

jest.mock('ioredis', () => require('ioredis-mock'));

describe('The Handler class', () => {
    it('should respect the constructor and interface', async() => {
        const handler = new DummyHandler('redis://127.0.0.1');

        const streamer = handler.getStreamer();

        expect(streamer).toBeInstanceOf(Streamer);
    });
});
