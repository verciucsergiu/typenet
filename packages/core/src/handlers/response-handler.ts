import { ServerResponse } from 'http';
import { Response } from '../http-responses';

export class ResponseHandler {
    constructor(private response: ServerResponse) {
    }

    public handle(response: Response | Promise<Response>): void {
        if (this.isResponse(response)) {
            this.sendResponse(response);
        } else {
            response.then((result: Response) => {
                this.sendResponse(result);
            });
        }
    }

    private sendResponse(result: Response): void {
        this.response.writeHead(result.statusCode, { 'Content-Type': 'application/json' });
        let responseMessage: string = '';
        try {
            responseMessage = JSON.stringify(result.message);
        } catch {
            responseMessage = '{ "message" : "' + result.message + '" }';
        }
        this.response.end(responseMessage);
        this.response.end();
    }

    private isResponse(arg: any): arg is Response {
        return arg.statusCode !== undefined;
    }
}