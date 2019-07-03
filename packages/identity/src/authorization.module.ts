import { Application } from '@typenet/core';
import { AuthorizationContainer } from './authorization-container';

export class AuthModule {
    public static registerAuth(app: Application, options: AuthorizationOptions) {
        AuthorizationContainer.useOptions(options);
    }

    public static registerRoleIdentification<T extends any = any>(roleIdentificationFunc: (token: T, role: string) => boolean) {
        AuthorizationContainer.useRoleIdentificationFunc(roleIdentificationFunc);
    }
}

export interface AuthorizationOptions {
    key: string;
    audience?: string;
    issuer?: string;
}