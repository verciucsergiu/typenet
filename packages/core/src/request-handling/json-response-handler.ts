import { ServerResponse } from 'http';
import { Injectable } from '../injector';
import { Observable } from 'rxjs';
import { ActionResult } from '../controller';
import { ResponseHandler } from './response-handler';

@Injectable()
export class JSONResponseHandler implements ResponseHandler {

    public handle(response: ActionResult, serverResponse: ServerResponse): void {
        const { statusCode, message } = response;
        if (this.isPromise(message)) {
            message
                .then((result) => this.sendResponse(statusCode, result, serverResponse))
                .catch(() => this.handleUncaughtException(serverResponse));
        } else if (this.isObservable(message)) {
            message.subscribe(
                (result) => this.sendResponse(statusCode, result, serverResponse),
                () => this.handleUncaughtException(serverResponse));
        } else {
            this.sendResponse(statusCode, message, serverResponse);
        }
    }

    private handleUncaughtException(serverResponse: ServerResponse): void {
        this.sendResponse(500, "Internal server error!", serverResponse)
    }

    private sendResponse(statusCode: number, message: Object, serverResponse: ServerResponse): void {
        serverResponse.writeHead(statusCode, { 'Content-Type': 'application/json' });
        let responseMessage: string = '';
        try {
            responseMessage = JSON.stringify(message);
        } catch {
            responseMessage = `{ "message" : " ${message}" }`;
        } finally {
            serverResponse.write(responseMessage || '');
            serverResponse.end();
        }
    }

    private isObservable<T>(arg: any): arg is Observable<T> {
        return arg && arg.subscribe && arg.pipe;
    }

    private isPromise<T>(arg: any): arg is Promise<T> {
        return arg && arg.then && arg.catch;
    }
}