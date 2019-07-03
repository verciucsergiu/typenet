import { Tree } from '@typenet/core/lib/routing/tree';
import { ClassDefinition } from '@typenet/core/lib/application/types/class-definition';
import { AuthorizationOptions } from './authorization.module';

const defaultRoleIdentification = (token: any, role: string) => {
    return token['role'] === role;
};

export class AuthorizationContainer {
    private static controllers: Tree<string[]> = {};
    private static authOptions: AuthorizationOptions;
    private static roleIdentification: (token: any, role: string) => boolean = defaultRoleIdentification;

    public static addController(controller: ClassDefinition): void {
        if (!this.controllers[controller.name]) {
            this.controllers[controller.name] = [];
        }

        this.controllers[controller.name].push('*');
    }

    public static addMethod(controller: ClassDefinition, methodName): void {
        if (!this.controllers[controller.name]) {
            this.controllers[controller.name] = [];
        }

        this.controllers[controller.name].push(methodName);
    }

    public static hasAuthorization(controller: string, methodName: string): boolean {
        if (!this.controllers[controller]) {
            return false;
        }

        if (this.controllers[controller].indexOf('*') !== -1) {
            return true;
        }

        if (this.controllers[controller].find((x) => x === methodName)) {
            return true;
        }

        return false;
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