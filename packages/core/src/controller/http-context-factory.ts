import { IncomingMessage } from "http";
import { HttpVerb } from "./types";
import { Injectable } from "../injector";
import { RequestBodyProvider } from "../request-handling/request-body-parser";
import { HttpContext } from "./types/http-context";
import { Route } from "../routing/route";
import { ApplicationSettings } from "../application";
import { QueryString } from "../routing";

@Injectable()
export class HttpContextFactory {

    constructor(private readonly bodyProvider: RequestBodyProvider) { }

    public create(request: IncomingMessage): HttpContext {
        const urlSplited = request.url.split('?');

        if (urlSplited.length > 2) {
            throw new Error(`Invalid url ${request.url}`);
        }

        const route = urlSplited[0];
        const query = new QueryString(urlSplited[1]);

        return {
            httpVersion: request.httpVersion,
            headers: request.headers,
            url: Route.create(route),
            query: query,
            method: request.method.toUpperCase() as HttpVerb,
            getBodyAsJson: <T>(): Promise<T> => this.bodyProvider.getBodyAsJson<T>(request)
        };
    }
}
