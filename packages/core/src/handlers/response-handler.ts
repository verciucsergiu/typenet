import { ServerResponse } from 'http';
import { ActionResult, ControllerMethodReturnType } from '../controller/http-responses';

export class ResponseHandler {

    public handle(response: ControllerMethodReturnType, serverResponse: ServerResponse): void {
        if (this.isResponse(response)) {
            this.sendResponse(response, serverResponse);
        } else if (this.isPomise(response)) {
            response.then((result: ActionResult) => {
                this.sendResponse(result, serverResponse);
            });
        } else {
            const subscription = response.subscribe((result) => {
                this.sendResponse(result, serverResponse);
                subscription.unsubscribe();
            });
        }
    }

    private sendResponse(result: ActionResult, serverResponse: ServerResponse): void {
        serverResponse.writeHead(result.statusCode, { 'Content-Type': 'application/json' });
        let responseMessage: string = '';
        try {
            responseMessage = JSON.stringify(result.message);
        } catch {
            responseMessage = `{ "message" : " ${result.message}" }`;
        }
        serverResponse.end(responseMessage);
        serverResponse.end();
    }

    private isResponse(arg: any): arg is ActionResult {
        return arg.statusCode !== undefined;
    }

    private isPomise<T>(arg: any): arg is Promise<T> {
        return arg.then !== undefined && arg.catch !== undefined;
    }
}