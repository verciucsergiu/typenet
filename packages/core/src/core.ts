import * as http from 'http';
import { AppParams } from './controller/decorators/models/app-params.model';
import { AppContainer } from './app-container/app-container';
import { DecoratorHandler } from './app-container/decorators-handler';
import { RequestHandler } from './handlers/request-handler';

export class WebApiBuilder {
    private startupClass: any;
    private requestHandler = new RequestHandler();

    public run(): void {
        const settings: AppParams = AppContainer.settings;
        DecoratorHandler.handle();
        http.createServer((request: http.IncomingMessage, response: http.ServerResponse) => {
            this.requestHandler.handle(request, response);
        }).listen(settings.port);

        console.log('Server is up and running at : http://localhost:' + settings.port);
    }

    public useStartupClass(startup: any): WebApiBuilder {
        this.startupClass = startup;
        return this;
    }
}