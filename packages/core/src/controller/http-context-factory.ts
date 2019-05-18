import { IncomingMessage } from "http";
import { HttpVerb } from "./types";
import { Injectable } from "../injector";
import { RequestBodyProvider } from "../request-handling/request-body-parser";
import { HttpContext } from "./types/http-context";
import { Route } from "../routing/route";
import { ApplicationSettings } from "../application";

@Injectable()
export class HttpContextFactory {

    constructor(private readonly bodyProvider: RequestBodyProvider, private readonly settings: ApplicationSettings) { }

    public create(request: IncomingMessage): HttpContext {
        return {
            httpVersion: request.httpVersion,
            headers: request.headers,
            url: Route.create(request.url),
            method: request.method as HttpVerb,
            getBodyAsJson: <T>(): Promise<T> => this.bodyProvider.getBodyAsJson<T>(request, this.settings.maxRequestSize)
        };
    }
}
