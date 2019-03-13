import { ServerResponse, IncomingMessage } from 'http';
import { ResponseHandler } from './response-handler';
import { NotFoundException } from '../server-exceptions/not-found.exception';
import { PayloadTooLargeException } from '../server-exceptions/payload-too-large.exception';
import { NotFound, InternalServerError } from '../http-responses';
import { Action } from '../app-container/types/action';
import { AppContainer } from '../app-container/app-container';

export class RequestHandler {
    private body: any = null;

    constructor(private request: IncomingMessage, private response: ServerResponse) {
        this.handle();
    }

    public handle(): void {
        const requestUrl: string = this.request.url.slice(1).toLowerCase();
        const verb: string = this.request.method.toUpperCase();
        const responseHandler: ResponseHandler = new ResponseHandler(this.response);
        process.on('unhandledRejection', (error) => {
            responseHandler.handle(new InternalServerError());
        });
        console.log(verb + ' : ' + requestUrl);
        this.getRequestBody(() => {
            try {
                const action: Action = AppContainer.getAction(requestUrl, verb, this.body);
                responseHandler.handle(action.executeAction());
            } catch (e) {
                if (e instanceof NotFoundException) {
                    responseHandler.handle(new NotFound());
                } else {
                    responseHandler.handle(new InternalServerError());
                }
            }
        });
    }

    private getRequestBody(callback: any): void {
        let jsonString: string = '';
        if (this.request.method.toUpperCase() !== 'GET') {
            this.request.on('data', (data) => {
                jsonString += data;
                if (jsonString.length > AppContainer.settings.maxRequestSize) {
                    jsonString = '';
                    throw new PayloadTooLargeException(
                        `Request size is larger than ${AppContainer.settings.maxRequestSize} ` +
                        `${this.request.url} -> ${this.request.method}!`);
                }
            });

            this.request.on('end', () => {
                this.body = JSON.parse(jsonString);
                callback();
            });
        } else {
            callback();
        }
    }
}