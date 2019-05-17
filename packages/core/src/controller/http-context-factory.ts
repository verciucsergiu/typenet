import { IncomingMessage } from "http";
import { HttpVerb } from "./types";
import { Injectable } from "../injector";
import { RequestBodyProvider } from "../handlers/request-body-parser";
import { AppContainer } from "../app-container/app-container";
import { HttpContext } from "./types/http-context";
import { Route } from "../app-container/route";

@Injectable()
export class HttpContextFactory {

    constructor(private readonly bodyProvider: RequestBodyProvider) { }

    public create(request: IncomingMessage): HttpContext {
        return {
            httpVersion: request.httpVersion,
            headers: request.headers,
            url: Route.create(request.url),
            method: request.method as HttpVerb,
            getBodyAsJson: <T>(): Promise<T> => this.bodyProvider.getBodyAsJson<T>(request, AppContainer.settings.maxRequestSize)
        };
    }
}
