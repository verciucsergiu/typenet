import { IncomingMessage, ServerResponse } from "http";
import { HttpVerb } from "../controller/types";
import { Injectable } from "../injector";
import { RequestBodyProvider } from "../request-handling/request-body-provider";
import { HttpContext, RequestContext, ResponseContext } from "./types/http-context";
import { Route } from "../routing/route";
import { QueryString } from "../routing";
import { ApplicationSettings } from "./types/application-settings";

@Injectable()
export class HttpContextFactory {

    constructor(private readonly bodyProvider: RequestBodyProvider, private readonly appSettings: ApplicationSettings) { }

    public create(request: IncomingMessage, response: ServerResponse): HttpContext {
        return {
            request: this.createRequestContext(request),
            response: this.createResponseContext(response)
        };
    }

    private createRequestContext(request: IncomingMessage): RequestContext {

        const { route, queryString } = this.splitUrlIntoRouteAndQuery(request);

        return {
            httpVersion: request.httpVersion,
            headers: request.headers,
            url: route,
            query: queryString,
            method: request.method.toUpperCase() as HttpVerb,
            getBodyAsJson: <T>(): Promise<T> => this.bodyProvider.getBodyAsJson<T>(request, this.appSettings.maxRequestSize)
        };
    }

    private splitUrlIntoRouteAndQuery(request: IncomingMessage): { route: Route, queryString: QueryString } {
        const urlSplited = request.url.split('?');

        if (urlSplited.length > 2) {
            throw new Error(`Invalid url ${request.url}`);
        }

        const routeString = urlSplited[0];
        const query = new QueryString(urlSplited[1]);
        const route = Route.create(routeString);

        return { route, queryString: query };
    }

    private createResponseContext(response: ServerResponse): ResponseContext {
        return response;
    }
}