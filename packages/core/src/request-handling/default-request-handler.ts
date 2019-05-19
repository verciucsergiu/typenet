import { ServerResponse, IncomingMessage } from 'http';
import { JSONResponseHandler } from './json-response-handler';
import { NotFoundException } from '../server-exceptions/not-found.exception';
import { NotFound, InternalServerError } from '../controller/http-responses';
import { ApplicationContainer } from '../application/application-container';
import { HttpVerb } from '../controller/types';
import { Injectable, DependencyContainer } from '../injector';
import { Route } from '../routing/route';
import { HttpContextFactory } from "../controller/http-context-factory";
import { RequestHandler } from './request-handler';

@Injectable()
export class DefaultRequestHandler implements RequestHandler {

    constructor(
        private readonly httpContextFactory: HttpContextFactory,
        private readonly responseHandler: JSONResponseHandler) {
    }

    public async handle(request: IncomingMessage, response: ServerResponse): Promise<void> {
        // FIX CONCURENCY SCOPE CREATION
        DependencyContainer.createScope();

        const httpContext = this.httpContextFactory.create(request);
        try {
            const action = ApplicationContainer.getActionCommand(httpContext.method, httpContext.url);
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