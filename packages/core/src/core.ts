import * as http from 'http';
import { RequestHandler } from './handlers/request-handler';
import { DependencyContainer } from './injector';
import { AppContainer } from './app-container/app-container';

export class WebApiBuilder {
    private requestHandler = DependencyContainer.resolve(RequestHandler);
    private startupClass: any;

    public run(): void {
        const settings = AppContainer.settings;
        http.createServer(async (request: http.IncomingMessage, response: http.ServerResponse) => {
            await this.requestHandler.handle(request, response);
        }).listen(settings.port).setMaxListeners(0);

        console.log('Server is up and running at : http://localhost:' + settings.port);
    }

    public useStartupClass(startup: any): WebApiBuilder {
        this.startupClass = startup;
        return this;
    }
}