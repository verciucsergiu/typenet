import { PipelineMiddleware, HttpContext, JSONResponseHandler, Unauthorized, Middleware } from '@typenet/core';
import { ApplicationContainer } from '@typenet/core/lib/application/application-container';
import { AuthorizationContainer } from './authorization-container';
import { TokenDecoder } from './token-decoder';

declare module '@typenet/core' {
    interface RequestContext {
        identity: any;
    }
}

@Middleware()
export class AuthorizationMiddleware implements PipelineMiddleware {
    constructor(private readonly jsonResponseHandler: JSONResponseHandler, private readonly tokenDecoder: TokenDecoder) { }

    public async apply(context: HttpContext, next: () => Promise<void>): Promise<void> {
        const action = ApplicationContainer.getActionCommand(context.request.method, context.request.url);
        const hasAuthoriation = AuthorizationContainer.hasAuthorization(action.controllerFunction.name, action.methodName);
        if (hasAuthoriation) {
            const tokenWithoutBearer = context.request.headers.authorization.substring(7);
            const tokenDecodeResult = await this.tokenDecoder.verifyToken(tokenWithoutBearer);
            if (!tokenDecodeResult.valid) {
                this.jsonResponseHandler.handle(new Unauthorized(), context.response);
            } else {
                // todo find better way to assign this
                (context.request as any).identity = tokenDecodeResult.value;
                await next();
            }
        } else {
            await next();
        }
    }
}