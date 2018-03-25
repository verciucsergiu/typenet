import { ServerResponse } from 'http';
import { IActionResult } from '../http-responses';

export class ResponseHandler {
    constructor(private response: ServerResponse) {
    }

    public handle(response: IActionResult): void {
        this.response.writeHead(response.statusCode, { 'Content-Type' : 'application/json' });
        let responseMessage: string = '';
        try {
            responseMessage = JSON.stringify(response.message);
        } catch {
            responseMessage = '{ "message" : "' + response.message + '" }';
        }
        this.response.end(responseMessage);
        this.response.end();
    }
}