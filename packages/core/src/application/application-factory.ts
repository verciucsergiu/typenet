import * as http from 'http';
import { RequestHandler, DefaultRequestHandler } from "../request-handling";
import { ClassDefinitionTyped, ClassDefinition } from './types/class-definition';
import { DependencyContainer } from '../injector/dependency-container';
import { METADATA } from '../metadata/metadata.constants';
import { ApplicationSettings } from './application-settings';
import { Application } from './application';
import { CorsBuilder } from './cors/cors.options';

export class ApplicationFactory {

    public static create(module: ClassDefinition): Application {
        const decoratedWithModule = Reflect.getMetadata(METADATA.MODULE, module);
        if (!decoratedWithModule) {
            throw new Error(`${module.name} is not decorated with @Module() decorator!`);
        }

        return new CoreApplication();
    }
}

class CoreApplication implements Application {
    private settings;
    private corsPolicyBuilderFunction;

    constructor() {
        this.settings = ApplicationSettings.defaultSettings();
        DependencyContainer.registerService(ApplicationSettings, 'singleInstance', this.settings);
    }

    public useSettings<T extends Object>(settings: T): void {
        this.settings = Object.assign(this.settings, settings);
        DependencyContainer.registerService(ApplicationSettings, 'singleInstance', this.settings);
    }

    public get<T>(injectable: ClassDefinitionTyped<T>): T {
        return DependencyContainer.resolve(injectable);
    }

    public useCorsPolicy(fnBuilder: (corsBuilder: CorsBuilder) => CorsBuilder): void {
        this.corsPolicyBuilderFunction = fnBuilder;
    }

    public run(): Promise<void> {
        const requestHandler: RequestHandler = DependencyContainer.resolve(DefaultRequestHandler);
        const server = this.createServer(requestHandler);
        server.listen(this.settings.port);
        return Promise.resolve();
    }

    private createServer(requestHandler: RequestHandler): http.Server {
        return http.createServer(async (request: http.IncomingMessage, response: http.ServerResponse) => {
            await requestHandler.handle(request, response);
        });
    }
}