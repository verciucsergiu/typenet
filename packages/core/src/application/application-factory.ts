import * as http from 'http';
import { DependencyContainer } from "../injector";
import { RequestHandler, DefaultRequestHandler } from "../request-handling";
import { Logger } from './logger';
import { ConsoleLogger } from './console.logger';

export class ApplicationFactory {

    public static create(): Application {
        const logger: Logger = DependencyContainer.resolve(ConsoleLogger);
        return new CoreApplication(logger);
    }
}

export interface Application {
    useSettings<T extends Object>(settings: T): Application;
    run(): Promise<void>;
}

export class ApplicationSettings implements ServerSettings {
    [key: string]: any;

    public maxRequestSize: number = this['maxRequestSize'];
    public port: number = this['port'];

    constructor(settings: any) {
        for (const setting in settings) {
            this[setting] = settings[setting];
        }
    }


    public get(key: string): any {
        return this[key];
    }

    public static defaultSettings(): ApplicationSettings {
        return new ApplicationSettings({
            maxRequestSize: 1e6,
            port: 3000
        });
    }
}

class CoreApplication implements Application {
    constructor(private readonly logger: Logger) { }

    private settings = ApplicationSettings.defaultSettings();

    public useSettings<T extends Object>(settings: T): Application {
        this.settings = Object.assign(this.settings, settings);
        return this;
    }

    public run(): Promise<void> {

        DependencyContainer.registerService(ApplicationSettings, 'singleInstance', this.settings);
        const requestHandler: RequestHandler = DependencyContainer.resolve(DefaultRequestHandler);
        const server = createServer(requestHandler);
        server.listen(this.settings.port);

        this.logger.log(`Application started.\nListening at http://localhost:${this.settings.port}/`)
        return Promise.resolve();
    }
}

function createServer(requestHandler: RequestHandler): http.Server {
    return http.createServer(async (request: http.IncomingMessage, response: http.ServerResponse) => {
        await requestHandler.handle(request, response);
    })
}

interface ServerSettings {
    maxRequestSize: number;
    port: number;
}