import * as http from 'http';
import { ClassDefinitionTyped, ClassDefinition } from './types/class-definition';
import { DependencyContainer } from '../injector/dependency-container';
import { METADATA } from '../metadata/metadata.constants';
import { ApplicationSettings } from "./types/application-settings";
import { Application } from './application';
import { CorsBuilder, CorsOptions } from './cors/cors-options';
import { RequestPipeline } from './request.pipeline';
import { ApplicationContainer } from './application-container';
import { CorsMiddleware } from './cors/cors.middleware';
import { EntryMiddleware } from './middleware/entry.middleware';

export class ApplicationFactory {

    public static create(module: ClassDefinition): Application {
        this.validateModule(module);
        return new CoreApplication();
    }

    private static validateModule(module: ClassDefinition): void {
        const decoratedWithModule = Reflect.getMetadata(METADATA.MODULE, module);
        if (!decoratedWithModule) {
            throw new Error(`${module.name} is not decorated with @Module() decorator!`);
        }
    }
}

export class CoreApplication implements Application {
    private settings;
    private corsPolicyBuilderFunction: (corsBuilder: CorsBuilder) => CorsBuilder;
    private runHandles: Array<(server: http.Server) => void> = [];
    private server: http.Server;

    constructor() {
        this.settings = ApplicationSettings.defaultSettings();
        DependencyContainer.registerService(ApplicationSettings, 'singleInstance', this.settings);
        this.runHandles.push(() => this.registerEntryMiddleware());
        this.runHandles.push(() => this.registerCorsIfNeeded());
    }

    public useSettings<T extends Object>(settings: T): this {
        this.settings = Object.assign(this.settings, settings);
        DependencyContainer.registerService(ApplicationSettings, 'singleInstance', this.settings);
        return this;
    }

    public get<T>(injectable: ClassDefinitionTyped<T>): T {
        return DependencyContainer.resolve(injectable);
    }

    public useCorsPolicy(fnBuilder: (corsBuilder: CorsBuilder) => CorsBuilder): this {
        this.corsPolicyBuilderFunction = fnBuilder;
        return this;
    }

    public run(): Promise<void> {
        const requestPipeline = DependencyContainer.resolve(RequestPipeline);
        const server = this.createServer(requestPipeline);
        this.server = server;

        this.execRunHandlers();
        server.listen(this.settings.port);
        return Promise.resolve();
    }

    public onRun(handler: (server: http.Server) => void): this {
        this.runHandles.push(handler);
        return this;
    }

    private execRunHandlers(): void {
        this.runHandles.forEach((handler) => handler(this.server));
    }

    private createServer(requestPipeline: RequestPipeline): http.Server {
        return http.createServer(async (request: http.IncomingMessage, response: http.ServerResponse) => {
            await requestPipeline.resolveRequest(request, response);
        });
    }
    private registerEntryMiddleware(): void {
        DependencyContainer.registerService(EntryMiddleware, 'singleInstance');
        ApplicationContainer.registerMiddleware(EntryMiddleware);
    }

    private registerCorsIfNeeded(): void {
        if (this.corsPolicyBuilderFunction) {
            DependencyContainer.registerService(CorsMiddleware, 'singleInstance');
            ApplicationContainer.registerMiddleware(CorsMiddleware);

            const builder = this.corsPolicyBuilderFunction(new CorsBuilder());
            const options = builder.build();
            DependencyContainer.registerService(CorsOptions, 'singleInstance', options);
        }
    }
}