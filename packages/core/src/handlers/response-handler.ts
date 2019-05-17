import { ServerResponse } from 'http';
import { ControllerMethodReturnType } from '../controller/http-responses';
import { Injectable } from '../injector';
import { Observable } from 'rxjs';

@Injectable()
export class JsonResponseHandler {

    public handle(response: ControllerMethodReturnType, serverResponse: ServerResponse): void {
        const {statusCode, message} = response;
        if(this.isPromise(message)) {
            message.then((result) => this.sendResponse(statusCode, result, serverResponse));
        } else if (this.isObservable(message)){
            message.subscribe((result) => this.sendResponse(statusCode, result, serverResponse));
        } else {
            this.sendResponse(statusCode, message, serverResponse);
        }
    }

    private sendResponse(statusCode: number, message: Object, serverResponse: ServerResponse): void {
        serverResponse.writeHead(statusCode, { 'Content-Type': 'application/json' });
        let responseMessage: string = '';
        try {
            responseMessage = JSON.stringify(message);
        } catch {
            responseMessage = `{ "message" : " ${message}" }`;
        }
        serverResponse.write(responseMessage);
        serverResponse.end();
    }

    private isObservable<T>(arg: any): arg is Observable<T> {
        return arg.subscribe !== undefined && arg.pipe !== undefined;
    }

    private isPromise<T>(arg: any): arg is Promise<T> {
        return arg.then !== undefined && arg.catch !== undefined;
    }
}