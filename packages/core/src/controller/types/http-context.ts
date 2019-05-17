import { HttpVerb } from ".";
import { HttpHeaders } from "./http-headers";
import { Route } from "../../app-container/route";

export interface HttpContext {
    httpVersion: string;
    headers: HttpHeaders;
    method: HttpVerb;
    url: Route;
    getBodyAsJson<T>(): Promise<T>;
}
