import { HttpContext } from "../application";

export interface RequestHandler {
    handle(httpContext: HttpContext): Promise<void>;
}