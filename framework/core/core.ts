import * as http from 'http';
import { AppParams } from './decorators/models';
import { AppContainer, DecoratorHandler } from './containers';
import { RequestHandler } from './handlers';
import { DbContext } from '../database';

export class Core {
    private startupClass: any;

    private database: DbContext;

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

    public useStartup(startup: any): Core {
        this.startupClass = startup;
        return this;
    }

    public useDatabase(database: DbContext): Core {
        this.database = database;
        return this;
    }
}