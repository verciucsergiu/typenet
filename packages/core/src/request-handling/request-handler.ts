import { ServerResponse, IncomingMessage } from "http";

export interface RequestHandler {
    handle(request: IncomingMessage, response: ServerResponse): Promise<void>;
}