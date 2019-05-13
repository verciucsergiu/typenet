import { ServerResponse } from 'http';
import { ActionResult, ControllerMethodReturnType } from '../controller/http-responses';

export class ResponseHandler {
    constructor(private serverResponse: ServerResponse) {
    }

    public handle(response: ControllerMethodReturnType): void {
        if (this.isResponse(response)) {
            this.sendResponse(response);
        } else if (this.isPomise(response)) {
            response.then((result: ActionResult) => {
                this.sendResponse(result);
            });
        } else {
            response.subscribe((result) => {
                this.sendResponse(result);
            });
        }
    }

    private sendResponse(result: ActionResult): void {
        this.serverResponse.writeHead(result.statusCode, { 'Content-Type': 'application/json' });
        let responseMessage: string = '';
        try {
            responseMessage = JSON.stringify(result.message);
        } catch {
            responseMessage = '{ "message" : "' + result.message + '" }';
        }
        this.serverResponse.end(responseMessage);
        this.serverResponse.end();
    }

    private isResponse(arg: any): arg is ActionResult {
        return arg.statusCode !== undefined;
    }

    private isPomise<T>(arg: any): arg is Promise<T> {
        return arg.then !== undefined && arg.catch !== undefined;
    }
}