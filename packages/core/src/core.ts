import * as http from 'http';
import { AppParams } from './controller/decorators/models/app-params.model';
import { AppContainer } from './app-container/app-container';
import { RequestHandler } from './handlers/request-handler';
import { DependencyContainer } from './injector';

export class WebApiBuilder {
    private requestHandler = DependencyContainer.resolve(RequestHandler);
    private startupClass: any;

    public run(): void {
        const settings: AppParams = AppContainer.settings;
        http.createServer((request: http.IncomingMessage, response: http.ServerResponse) => {
            this.requestHandler.handle(request, response);
        }).listen(settings.port).setMaxListeners(0);

        console.log('Server is up and running at : http://localhost:' + settings.port);
    }

    public useStartupClass(startup: any): WebApiBuilder {
        this.startupClass = startup;
        return this;
    }
}