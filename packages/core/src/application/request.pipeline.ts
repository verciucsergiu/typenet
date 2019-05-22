import { IncomingMessage, ServerResponse } from "http";
import { Injectable } from "../injector";
import { DefaultRequestHandler } from "../request-handling";
import { ApplicationContainer } from "./application-container";
import { HttpContextFactory } from "./http-context-factory";
import { DependencyContainer } from "../injector/dependency-container";
import { PipelineMiddleware } from "./middleware/middleware";
import { HttpContext } from "./types/http-context";

@Injectable('singleInstance')
export class RequestPipeline {

    constructor(
        private readonly requestHandler: DefaultRequestHandler,
        private readonly httpContextFactory: HttpContextFactory) { }

    public async resolveRequest(request: IncomingMessage, response: ServerResponse): Promise<void> {
        const httpContext = this.httpContextFactory.create(request, response);
        this.executeMiddlewares(httpContext);
    }

    private executeMiddlewares(httpContext: HttpContext): void {
        const middlewares = ApplicationContainer.getMiddlewares();

        const middlewaresInstances: PipelineMiddleware[] = [];
        for (const middleware of middlewares) {
            middlewaresInstances.push(DependencyContainer.resolve(middleware) as PipelineMiddleware);
        }

        this.handleMiddlware(httpContext, middlewaresInstances, 0);
    }

    private handleMiddlware(httpContext: HttpContext, middlewares: PipelineMiddleware[], index: number) {
        const next: Function = index >= middlewares.length - 1 ?
            () => this.resolve(httpContext) :
            () => this.handleMiddlware(httpContext, middlewares, index + 1);

        middlewares[index].apply(httpContext, next);
    }

    private resolve(httpContext: HttpContext) {
        this.requestHandler.handle(httpContext);
    }
}