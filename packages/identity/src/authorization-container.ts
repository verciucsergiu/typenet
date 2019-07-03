import { Tree } from '@typenet/core/lib/routing/tree';
import { ClassDefinition } from '@typenet/core/lib/application/types/class-definition';
import { AuthorizationOptions } from './authorization.module';

const defaultRoleIdentification = (token: any, role: string) => {
    return token['role'] === role;
};

export class AuthorizationContainer {
    private static controllers: Tree<Array<{ methodName: string, role: string }>> = {};
    private static authOptions: AuthorizationOptions;
    private static roleIdentification: (token: any, role: string) => boolean = defaultRoleIdentification;

    public static addController(controller: ClassDefinition, role?: string): void {
        if (!this.controllers[controller.name]) {
            this.controllers[controller.name] = [];
        }

        this.controllers[controller.name].push({ methodName: '*', role: role });
    }

    public static addMethod(controller: ClassDefinition, methodName: string, role?: string): void {
        if (!this.controllers[controller.name]) {
            this.controllers[controller.name] = [];
        }

        this.controllers[controller.name].push({ methodName, role });
    }

    public static hasAuthorization(controller: string, methodName: string): boolean {
        if (!this.controllers[controller]) {
            return false;
        }

        if (this.controllers[controller].find((x) => x.methodName === '*')) {
            return true;
        }

        if (this.controllers[controller].find((x) => x.methodName === methodName)) {
            return true;
        }

        return false;
    }

    public static getRoles(controller: string, methodName: string): string[] {
        if (this.controllers[controller]) {
            const roles = [];
            roles.push(this.controllers[controller].filter((x) => x.methodName === '*'));
            const method = this.controllers[controller].filter((x) => x.methodName === methodName);
            if (method) {
                roles.push(method.map((x) => x.role));
            }

            return roles;
        }

        return null;
    }

    public static useOptions(options: AuthorizationOptions): void {
        this.authOptions = options;
    }

    public static get options(): AuthorizationOptions {
        return this.authOptions;
    }

    public static useRoleIdentificationFunc(func: (token: any, role: string) => boolean): void {
        this.roleIdentification = func;
    }

    public static get roleIdentificationFunc(): (token: any, role: string) => boolean {
        return this.roleIdentificationFunc;
    }
}