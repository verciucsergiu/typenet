import { ServerResponse, IncomingMessage } from 'http';
import { JsonResponseHandler } from './json-response-handler';
import { NotFoundException } from '../server-exceptions/not-found.exception';
import { NotFound, InternalServerError } from '../controller/http-responses';
import { AppContainer } from '../app-container/app-container';
import { RequestBodyProvider } from './request-body-parser';
import { HttpVerb } from '../controller/types';
import { Injectable } from '../injector';
import { Route } from '../app-container/route';

@Injectable()
export class RequestHandler {

    constructor(
        private readonly requestBodyProvider: RequestBodyProvider, 
        private readonly responseHandler: JsonResponseHandler) {
    }

    public handle(request: IncomingMessage, response: ServerResponse): void {
        const verb = request.method.toUpperCase() as HttpVerb;
        const subscription = this.requestBodyProvider.getBodyAsJson(request, AppContainer.settings.maxRequestSize).subscribe(body => {
            try {
                const action = AppContainer.getActionCommand(verb, Route.create(request.url));
                this.responseHandler.handle(action.execute(), response);
            } catch (e) {
                if (e instanceof NotFoundException) {
                    this.responseHandler.handle(new NotFound(), response);
                } else {
                    this.responseHandler.handle(new InternalServerError(), response);
                }
            } finally {
                subscription.unsubscribe();
            }
        });
    }
}