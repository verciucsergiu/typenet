import { PipelineMiddleware } from "./middleware";
import { HttpContext } from "../types/http-context";
import { ServerResponse } from "http";
import { ConsoleLogger } from "../console.logger";

export class EntryMiddleware implements PipelineMiddleware {
    constructor(private readonly logger: ConsoleLogger) { }

    public async apply(context: HttpContext, next: () => Promise<void>): Promise<void> {
        try {
            await next();
            this.endRequest(context);
        } catch (e) {
            console.log('Something went wrong!');
            this.endRequest(context);
        }
    }

    private endRequest(context: HttpContext) {
        const contextAsServerResponse = (context.response as any as ServerResponse);
        if (!contextAsServerResponse.finished) {
            contextAsServerResponse.end();
        } else {
            this.logger.error('Server response finished before exiting the application pipeline!');
        }
    }
}