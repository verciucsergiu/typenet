import { ServerRequest, ServerResponse } from 'http';
import { AppContainer } from '../containers';
import { ResponseHandler } from './response-handler';
import { ControllerContainerModel, ActionContainer, Action } from '../containers/models';
import { NotFoundException, PayloadTooLargeException } from './server-exceptions';
import { NotFound, InternalServerError } from '..';

export class RequestHandler {
    private body: any = null;

    constructor(private request: ServerRequest, private response: ServerResponse) {
        this.handle();
    }

    public handle(): void {
        const requestUrl: string = this.request.url.slice(1).toLowerCase();
        const verb: string = this.request.method.toUpperCase();
        const responseHandler: ResponseHandler = new ResponseHandler(this.response);
        console.log(requestUrl + ' verb -> ' + verb);
        this.getRequestBody(() => {
            try {
                const action: Action = AppContainer.getAction(requestUrl, verb, this.body);
                responseHandler.handle(action.executeAction());
            } catch (e) {
                if (e instanceof NotFoundException) {
                    responseHandler.handle(new NotFound('Not found!'));
                } else {
                    responseHandler.handle(new InternalServerError('Internal server error!'));
                }
            }
        });
    }

    private getRequestBody(callback: any): void {
        let jsonString = '';
        if (this.request.method.toUpperCase() !== 'GET') {
            this.request.on('data', (data) => {
                jsonString += data;
                if (jsonString.length > AppContainer.settings.maxRequestSize) {
                    jsonString = '';
                    throw new PayloadTooLargeException('');
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