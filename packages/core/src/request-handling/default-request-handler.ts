import { JSONResponseHandler } from './json-response-handler';
import { NotFoundException } from '../server-exceptions/not-found.exception';
import { NotFound, InternalServerError } from '../controller/http-responses';
import { ApplicationContainer } from '../application/application-container';
import { Injectable } from '../injector';
import { RequestHandler } from './request-handler';
import { DependencyContainer } from '../injector/dependency-container';
import { HttpContext } from '../application';

@Injectable()
export class DefaultRequestHandler implements RequestHandler {

    constructor(
        private readonly responseHandler: JSONResponseHandler) {
    }

    public async handle(httpContext: HttpContext): Promise<void> {
        // FIX CONCURENCY SCOPE CREATION
        DependencyContainer.createScope();

        try {
            const action = ApplicationContainer.getActionCommand(httpContext.request.method, httpContext.request.url);
            const actionResult = await action.execute(httpContext);
            this.responseHandler.handle(actionResult, httpContext.response);
        } catch (e) {
            if (e instanceof NotFoundException) {
                this.responseHandler.handle(new NotFound(), httpContext.response);
            } else {
                this.responseHandler.handle(new InternalServerError(), httpContext.response);
            }
        }
    }
}