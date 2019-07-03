import { PipelineMiddleware, HttpContext, JSONResponseHandler, Unauthorized, Middleware } from '@typenet/core';
import { ApplicationContainer } from '@typenet/core/lib/application/application-container';
import { AuthorizationContainer } from './authorization-container';
import { TokenDecoder } from './token-decoder';
import { ServerResponse } from 'http';

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
                this.unauthorizeRequest(context);
            } else {
                const allRoles = AuthorizationContainer.getRoles(action.controllerFunction.name, action.methodName);
                const rolesToCheck = allRoles.filter((x) => x !== '');
                if (!this.areRolesProvided(tokenDecodeResult.value, rolesToCheck)) {
                    this.unauthorizeRequest(context);
                } else {
                    (context.request as any).identity = tokenDecodeResult.value;
                    await next();
                }
            }
        } else {
            await next();
        }
    }

    private areRolesProvided(token: any, rolesToCheck: string[]): boolean {
        for (const role of rolesToCheck) {
            if (!AuthorizationContainer.roleIdentificationFunc(token, role)) {
                return false;
            }
        }
        return true;
    }

    private unauthorizeRequest(context: HttpContext): void {
        this.jsonResponseHandler.handle(new Unauthorized(), context.response);
        this.endRequest(context);
    }

    private endRequest(context: HttpContext): void {
        const contextAsServerResponse = (context.response as any as ServerResponse);
        if (!contextAsServerResponse.finished) {
            contextAsServerResponse.end();
        }
    }
}