import * as http from 'http';
import { RequestHandler, DefaultRequestHandler } from "../request-handling";
import { ClassDefinitionTyped, ClassDefinition } from './types/class-definition';
import { DependencyContainer } from '../injector/dependency-container';
import { METADATA } from '../metadata/metadata.constants';

export class ApplicationFactory {

    public static create(module: ClassDefinition): Application {
        const decoratedWithModule = Reflect.getMetadata(METADATA.MODULE, module);
        if (!decoratedWithModule) {
            throw new Error(`${module.name} is not decorated with @Module() decorator!`);
        }

        return new CoreApplication();
    }
}

export interface Application {
    useSettings<T extends Object>(settings: T): void;
    get<T>(injectable: ClassDefinitionTyped<T>): T;
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

    private settings = ApplicationSettings.defaultSettings();

    public useSettings<T extends Object>(settings: T): void {
        this.settings = Object.assign(this.settings, settings);
    }

    public get<T>(injectable: ClassDefinitionTyped<T>): T {
        return DependencyContainer.resolve(injectable);
    }

    public run(): Promise<void> {

        DependencyContainer.registerService(ApplicationSettings, 'singleInstance', this.settings);
        const requestHandler: RequestHandler = DependencyContainer.resolve(DefaultRequestHandler);
        const server = createServer(requestHandler);
        server.listen(this.settings.port);
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