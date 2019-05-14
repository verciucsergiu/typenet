import { ServerResponse, IncomingMessage } from 'http';
import { ResponseHandler } from './response-handler';
import { NotFoundException } from '../server-exceptions/not-found.exception';
import { NotFound, InternalServerError } from '../controller/http-responses';
import { AppContainer } from '../app-container/app-container';
import { RequestBodyProvider } from './request-body-parser';
import { HttpVerb } from '../controller/types';

export class RequestHandler {
    private requestBodyParser = new RequestBodyProvider();
    private responseHandler = new ResponseHandler();

    public handle(request: IncomingMessage, response: ServerResponse): void {
        const requestUrl = request.url.slice(1).toLowerCase();
        const verb = request.method.toUpperCase() as HttpVerb;

        const subscription = this.requestBodyParser.getBodyAsJson(request, AppContainer.settings.maxRequestSize).subscribe(body => {
            try {
                const action = AppContainer.getActionCommand(verb, requestUrl, body);
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

        // TODO: MEMORY LEAK
        // // process.on('unhandledRejection', () => {
        // //     this.responseHandler.handle(new InternalServerError(), response);
        // // });
    }
}