import { HttpVerb } from "./http-verb";
import { HttpHeaders } from "./http-headers";
import { Route } from "../../routing/route";

export interface HttpContext {
    httpVersion: string;
    headers: HttpHeaders;
    method: HttpVerb;
    url: Route;
    getBodyAsJson<T>(): Promise<T>;
}
