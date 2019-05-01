import { ServerResponse, IncomingMessage } from 'http';
import { ResponseHandler } from './response-handler';
import { NotFoundException } from '../server-exceptions/not-found.exception';
import { NotFound, InternalServerError } from '../http-responses';
import { Action } from '../app-container/types/action';
import { AppContainer } from '../app-container/app-container';
import { RequestBodyProvider } from '../utils/request-body-parser';

export class RequestHandler {
    public handle(request: IncomingMessage, response: ServerResponse): void {
        const requestUrl: string = request.url.slice(1).toLowerCase();
        const verb: string = request.method.toUpperCase();
        const responseHandler: ResponseHandler = new ResponseHandler(response);
        
        process.on('unhandledRejection', (error) => {
            responseHandler.handle(new InternalServerError());
        });
        
        console.log(verb + ' : ' + requestUrl);
        
        const requestBodyParser = new RequestBodyProvider();

        requestBodyParser.getBodyAsJson(request, AppContainer.settings.maxRequestSize).subscribe(body => {
            try {
                const action: Action = AppContainer.getAction(requestUrl, verb, body);
                responseHandler.handle(action.executeAction());
            } catch (e) {
                if (e instanceof NotFoundException) {
                    responseHandler.handle(new NotFound());
                } else {
                    responseHandler.handle(new InternalServerError());
                }
            }
        })
        
    }
}