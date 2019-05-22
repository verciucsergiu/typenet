import { HttpVerb } from "../../controller/types/http-verb";
import { HttpHeaders } from "../../controller/types/http-headers";
import { Route, QueryString } from "../../routing";
import { OutgoingHttpHeaders } from "http";

export interface HttpContext {
    request: RequestContext;
    response: ResponseContext;
}

export interface RequestContext {
    httpVersion: string;
    headers: HttpHeaders;
    method: HttpVerb;
    url: Route;
    query: QueryString;
    getBodyAsJson<T>(): Promise<T>;
}

export interface ResponseContext {
    setHeader(key: string, value: string | string[]): void;
    writeHead(statusCode: number, headers?: OutgoingHttpHeaders): this;
    removeHeader(name: string): void;
    flushHeaders(): void;
    hasHeader(name: string): boolean;
    write(chunk: any, cb?: (error: Error | null | undefined) => void): boolean;
    write(chunk: any, encoding?: string, cb?: (error: Error | null | undefined) => void): boolean;
}
