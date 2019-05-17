import { ServerResponse, IncomingMessage } from 'http';
import { JSONResponseHandler } from './json-response-handler';
import { NotFoundException } from '../server-exceptions/not-found.exception';
import { NotFound, InternalServerError } from '../controller/http-responses';
import { AppContainer } from '../app-container/app-container';
import { HttpVerb } from '../controller/types';
import { Injectable } from '../injector';
import { Route } from '../app-container/route';
import { HttpContextFactory } from "../controller/http-context-factory";

@Injectable()
export class RequestHandler {

    constructor(
        private readonly httpContextFactory: HttpContextFactory,
        private readonly responseHandler: JSONResponseHandler) {
    }

    public async handle(request: IncomingMessage, response: ServerResponse): Promise<any> {
        const verb = request.method.toUpperCase() as HttpVerb;
        const httpContext = this.httpContextFactory.create(request);
        try {
            const action = AppContainer.getActionCommand(verb, Route.create(request.url));
            this.responseHandler.handle(await action.execute(httpContext), response);
        } catch (e) {
            if (e instanceof NotFoundException) {
                this.responseHandler.handle(new NotFound(), response);
            } else {
                this.responseHandler.handle(new InternalServerError(), response);
            }
        }
    }
}