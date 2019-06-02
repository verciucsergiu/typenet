import { WebSocketHub, Subscribe } from "@typenet/web-socket";
import { Socket } from 'socket.io';
@WebSocketHub()
export class ChatHub {

    @Subscribe('joined')
    public connect(socket: Socket, message: any): void {
        socket.broadcast.emit('user-joined', { username: message.username });
    }
}