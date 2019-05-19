import { HttpVerb } from "./http-verb";
import { HttpHeaders } from "./http-headers";
import { Route, QueryString } from "../../routing";

export interface HttpContext {
    httpVersion: string;
    headers: HttpHeaders;
    method: HttpVerb;
    url: Route;
    query: QueryString;
    getBodyAsJson<T>(): Promise<T>;
}
