import { PipelineMiddleware } from "./middleware";
import { HttpContext } from "../types/http-context";
import { ServerResponse } from "http";

export class EntryMiddleware implements PipelineMiddleware {
    public async apply(context: HttpContext, next: () => Promise<void>): Promise<void> {
        await next();
        const contextAsServerResponse = (context.response as any as ServerResponse);
        if (!contextAsServerResponse.finished) {
            contextAsServerResponse.end();
        }
    }
}