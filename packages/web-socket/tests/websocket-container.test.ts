import 'mocha';
import { expect } from 'chai';
import {WebSocketHub, Subscribe } from '../src';
import { Server, Socket } from 'socket.io';
import { WebSocketContainer } from '../src/websocket.container';

describe('Websocket container', () => {
    beforeEach(() => {
        WebSocketContainer['internalHubs'] = {};
        WebSocketContainer['internalSubscriptions'] = {};
    });

    it('Should validate throw exception when subscriptions is made outside of hubs', () => {
        const registerInvalidHub = () => {
            class NonHub {
                @Subscribe('test')
                public init(socket?: Socket, data?: any): void {
                }
            }
        };
        registerInvalidHub();

        expect(() => WebSocketContainer.validate()).to.throw();
    });

    it('Should validate not throw exception when subscriptions is made inside of hubs', () => {

        const registerValidHub = () => {
            @WebSocketHub()
            class Hub {
                @Subscribe('test')
                public init(socket: Socket, data: any): void {
                }
            }
        };
        registerValidHub();

        expect(() => WebSocketContainer.validate()).to.not.throw();
    });
});