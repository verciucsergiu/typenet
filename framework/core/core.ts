import * as http from 'http';
import { DependencyContainer } from '../injector';
import { RequestHandler } from './handlers/request-handler';
import { DecoratorHandler } from './decorators/decorators-handler';
import { AppContainer } from './app-container/app-container';
import { AppParams } from './decorators/models/app-params.model';

export class WebApiBuilder {
    private startupClass: any;

    constructor() {
    }

    public run(): void {
        const settings: AppParams = AppContainer.settings;
        http.createServer((request: http.IncomingMessage, response: http.ServerResponse) => {
            new RequestHandler(request, response);

        }).listen(settings.port);
        DecoratorHandler.handle();

        console.log('Server is up and running at : http://localhost:' + settings.port);
    }

    public useStartupClass(startup: any): WebApiBuilder {
        this.startupClass = startup;
        return this;
    }

    public useDatabase(type: Function, database: any): WebApiBuilder {
        DependencyContainer.set({ global: true, value: database, type: type });
        return this;
    }
}