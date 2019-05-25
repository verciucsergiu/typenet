import * as http from 'http';
import * as io from 'socket.io';
import { WebSocketContainer } from './websocket.container';
import { DependencyContainer } from '@typenet/core/lib/injector/dependency-container';

export class WebsocketServer {
    private socketServer: io.Server;

    constructor(httpServer: http.Server) {
        this.socketServer = io(httpServer);
    }

    public registerHandlers(): void {
        const subs = WebSocketContainer.subscriptions;
        this.socketServer.on('connection', (socket: io.Socket) => {
            for (const sub in subs) {
                if (subs.hasOwnProperty(sub)) {
                    const element = subs[sub];
                    const instance = DependencyContainer.resolve(WebSocketContainer.hubs[sub]);
                    element.subs.forEach((x) => {
                        socket.on(x.subscription, (data) => {
                            if (instance[x.methodName]) {
                                instance[x.methodName](socket, data);
                            }
                        });
                    });
                }
            }
        });
    }
}