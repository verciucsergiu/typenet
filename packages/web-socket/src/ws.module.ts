import { Application } from '@typenet/core';
import { Server } from 'http';
import { WebsocketServer } from './websocket-server';
import { WebSocketContainer } from './websocket.container';

export class WsModule {
    public static registerWebSockets(app: Application): void {
        WebSocketContainer.validate();
        app.onRun((server: Server) => {
            const socketsServer = new WebsocketServer(server);
            socketsServer.registerHandlers();
        });
    }
}