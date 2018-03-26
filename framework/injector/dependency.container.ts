import { InjectableClass } from './injectable-class';
import { InjectProperty } from './inject-property';
import { Scope } from '.';

export class DependencyContainer {
    /*
     * Singleton classes that can be injected.
     * Instance property should be populate when added!
     */
    private static globalClasses: Array<InjectableClass> = new Array<InjectableClass>();

    /*
     * Instance per dependency for repositories or services.
     */
    private static dependecyClasses: Array<InjectableClass> = new Array<InjectableClass>();

    /*
     * Properties that need to be injected!
     */
    private static toBeInjectedProperties: Array<InjectProperty> = new Array<InjectProperty>();

    public static addInjectProperty(prop: InjectProperty): void {
        this.toBeInjectedProperties.push(prop);
    }

    public static addInjectableClass(injectableClass: InjectableClass, type: Scope): void {
        if (type === Scope.Singleton) {
            this.globalClasses.push(injectableClass);
        } else {
            this.dependecyClasses.push(injectableClass);
        }
    }

    public static getClass(name: string): InjectableClass {
        const instance: InjectableClass = this.globalClasses.find((i: InjectableClass) => i.name === name);
        console.log(instance.instance);
        return instance;
    }

    public static resolveClass(className: string): Array<any> {
        const prop: Array<InjectProperty> =
            this.toBeInjectedProperties.filter((property: InjectProperty) => property.className === className);
        const injectableClasses: Array<InjectableClass> = new Array<InjectableClass>();
        prop.forEach((pr: InjectProperty) => {
            const glClasses = this.globalClasses.filter((cla: InjectableClass) => cla.name === pr.parameterType);
            const depClasses = this.dependecyClasses.filter((cla: InjectableClass) => cla.name === pr.parameterType);
            injectableClasses.push(...glClasses);
            injectableClasses.push(...depClasses);
        });
        console.log(injectableClasses);
        return null;
    }
}