import { Application } from '@typenet/core';
import { AuthorizationContainer } from './authorization-container';

export class AuthModule {
    public static registerAuth(app: Application, options: AuthorizationOptions) {
        AuthorizationContainer.useOptions(options);
    }
}

export interface AuthorizationOptions {
    key: string;
    audience?: string;
    issuer?: string;
}