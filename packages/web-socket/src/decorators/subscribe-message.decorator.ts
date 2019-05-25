import { WebSocketContainer } from "../websocket.container";
import { Socket } from "socket.io";

export function Subscribe(messageName: string) {
    return <F extends (socket: Socket, data: any) => void>
        (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<F>) => {
        WebSocketContainer.addSubscription(target.constructor, propertyKey, messageName);
    };
}