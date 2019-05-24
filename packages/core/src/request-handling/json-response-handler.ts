import { Injectable } from '../injector';
import { Observable } from 'rxjs';
import { ActionResult } from '../controller';
import { ResponseHandler } from './response-handler';
import { ResponseContext } from '../application';

@Injectable()
export class JSONResponseHandler implements ResponseHandler {

    public handle(response: ActionResult, requestContext: ResponseContext): void {
        const { statusCode, message } = response;
        if (this.isPromise(message)) {
            message
                .then((result) => this.writeResponse(statusCode, result, requestContext))
                .catch(() => this.handleUncaughtException(requestContext));
        } else if (this.isObservable(message)) {
            const subscription = message.subscribe(
                (result) => this.writeResponse(statusCode, result, requestContext),
                () => this.handleUncaughtException(requestContext),
                () => { subscription.unsubscribe(); });
        } else {
            this.writeResponse(statusCode, message, requestContext);
        }
    }

    private handleUncaughtException(responseContext: ResponseContext): void {
        this.writeResponse(500, "Internal server error!", responseContext);
    }

    private writeResponse(statusCode: number, message: Object, requestContext: ResponseContext): void {
        requestContext.writeHead(statusCode, { 'Content-Type': 'application/json' });
        let responseMessage: string = '';
        try {
            responseMessage = JSON.stringify(message);
        } catch {
            responseMessage = `{ "message" : " ${message}" }`;
        } finally {
            requestContext.write(responseMessage || '');
        }
    }

    private isObservable<T>(arg: any): arg is Observable<T> {
        return arg && arg.subscribe && arg.pipe;
    }

    private isPromise<T>(arg: any): arg is Promise<T> {
        return arg && arg.then && arg.catch;
    }
}