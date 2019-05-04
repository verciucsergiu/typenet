import 'reflect-metadata';

export class DependencyContainer {

    public static readonly services: Function[] = [];
    public static instances: any[] = [];

    public static registerService(service: Function): void {
        this.services[service.name] = Reflect.getMetadata('design:paramtypes', service);
    }

    public static resolve(classToInstantiate: Function): any {
        const instance = this.getInternalInstance(classToInstantiate);
        this.instances = [];

        return instance;
    }

    private static getInternalInstance(classToInstantiate: Function): any {
        if (this.instances[classToInstantiate.name] !== undefined) {
            return this.instances[classToInstantiate.name];
        }

        const classArgs = this.services[classToInstantiate.name];

        if(classArgs !== undefined && classArgs.length > 0) {
            const params: Function[] = [];

            for (const arg of classArgs) {
                params.push(this.getInternalInstance(arg));
            }
            
            const instance = new classToInstantiate.prototype.constructor(...params);
            this.instances[classToInstantiate.name] = instance;

            return instance;
        } else {
            const instance = new classToInstantiate.prototype.constructor();
            this.instances[classToInstantiate.name] = instance;
            
            return new classToInstantiate.prototype.constructor();
        }
    }
}