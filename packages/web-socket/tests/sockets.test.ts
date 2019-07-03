import 'mocha';

import { expect } from 'chai';
import { Module, ApplicationFactory } from '@typenet/core';
import { WsModule, WebSocketHub, Subscribe } from '../src';
import { Socket } from 'socket.io';
import * as io from 'socket.io-client';

describe('Sockets', () => {
    const socketUrl = 'http://0.0.0.0:5000';
    const options: any = {
        'transports': ['websocket'],
        'force new connection': true
    };
    @WebSocketHub()
    class ChatHub {
        @Subscribe('message')
        public incomingMessage(socket: Socket, data: string): void {
            socket.emit('data received', data);
        }
    }

    @Module({
        providers: [ChatHub]
    })
    class ApplicationModule { }

    it('Should exchange messages between server and client', async () => {
        const message = 'hello world!';
        const settings = { port: 5000 };
        const app = ApplicationFactory.create(ApplicationModule);
        app.useSettings(settings);
        WsModule.registerWebSockets(app);
        await app.run();

        const client = io.connect(socketUrl, options);
        client.on('connect', () => {
            client.emit('message', message);
            client.on('data received', (data) => {
                expect(data).to.be.equal(message);
                client.disconnect();
                app['server'].close();
            });
        });
    });
});