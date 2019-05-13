import { ServerResponse, IncomingMessage } from 'http';
import { ResponseHandler } from './response-handler';
import { NotFoundException } from '../server-exceptions/not-found.exception';
import { NotFound, InternalServerError } from '../controller/http-responses';
import { AppContainer } from '../app-container/app-container';
import { RequestBodyProvider } from './request-body-parser';
import { HttpVerb } from '../controller/types';

export class RequestHandler {

    public handle(request: IncomingMessage, response: ServerResponse): void {
        const requestUrl = request.url.slice(1).toLowerCase();
        const verb = request.method.toUpperCase() as HttpVerb;
        const responseHandler = new ResponseHandler(response);
        
        process.on('unhandledRejection', (error) => {
            responseHandler.handle(new InternalServerError());
        });
        
        console.log(verb + ' : ' + requestUrl);
        
        const requestBodyParser = new RequestBodyProvider();

        requestBodyParser.getBodyAsJson(request, AppContainer.settings.maxRequestSize).subscribe(body => {
            try {
                const action = AppContainer.getActionCommand(verb, requestUrl, body);
                responseHandler.handle(action.execute());
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