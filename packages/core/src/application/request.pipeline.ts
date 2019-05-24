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
        await this.executeMiddlewares(httpContext);
    }

    private async executeMiddlewares(httpContext: HttpContext): Promise<void> {
        const middlewares = ApplicationContainer.getMiddlewares();

        const middlewaresInstances: PipelineMiddleware[] = [];
        for (const middleware of middlewares) {
            middlewaresInstances.push(DependencyContainer.resolve(middleware) as PipelineMiddleware);
        }

        await this.handleMiddlware(httpContext, middlewaresInstances, 0);
    }

    private async handleMiddlware(httpContext: HttpContext, middlewares: PipelineMiddleware[], index: number): Promise<void> {
        const next = index >= middlewares.length - 1 ?
            () => Promise.resolve(this.resolve(httpContext))  :
            () => Promise.resolve(this.handleMiddlware(httpContext, middlewares, index + 1));

        await middlewares[index].apply(httpContext, next);
    }

    private async resolve(httpContext: HttpContext) {
        await this.requestHandler.handle(httpContext);
    }
}