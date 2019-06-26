import { WebSocketHub, Subscribe } from "@typenet/web-socket";
import { Socket } from 'socket.io';
import { messages } from './messages';

@WebSocketHub()
export class ChatHub {

    @Subscribe('join')
    public connect(socket: Socket, message: any): void {
        socket.broadcast.emit('user-joined', { username: message.username });
        socket.emit('welcome', messages.welcome);
    }

    @Subscribe('message')
    public messageReceived(socket: Socket, message: any): void {
        socket.broadcast.emit('user-message', message);
    }

    @Subscribe('typing')
    public typing(socket: Socket, message: any): void {
        socket.broadcast.emit('user-typing', { username: message.username });
    }

    @Subscribe('left')
    public userLeft(socket: Socket, message: any): void {
        socket.broadcast.emit('user-left', { username: message.username });
    }
}