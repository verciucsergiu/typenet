import { ServiceMetadata } from './types/service-metadata';
import { PropertyMetadata } from './types/property-metadata';
import { InjectableNotFound } from './errors/service-not-found';

export class DependencyContainer {

    private static services: Array<ServiceMetadata> = [];

    private static handlers: Array<PropertyMetadata> = [];

    /**
     * Adds given service to the container list of services.
     * @param service ServiceMetadata
     */
    public static set(service: ServiceMetadata): void {
        this.services.push(service);
    }

    /**
     * Adds given handler to the container list.
     * @param handler PropertyMetadata
     */
    public static register(handler: PropertyMetadata): void {
        this.handlers.push(handler);
    }

    /**
     * Returns a global/new instance of the type requested.
     * Not recommended to use outside of the framework.
     * @param type Function
     */
    public static get(type: Function): any {
        // find the required type
        const service = this.services.find((s: ServiceMetadata) => s.type === type);
        if (!service) {
            throw new InjectableNotFound(type);
        } else if (service.global && service.value) {
            return service.value;
        }

        // at this point we know that the service is a transient type and a new instance is needed.
        const properties = this.handlers.filter((p: PropertyMetadata) => p.target === type);
        const params = new Array<any>();
        for (const prop of properties) {
            const propInstance = this.get(prop.type);
            params[prop.index + 1] = propInstance;
        }

        // make new instance of the injectable required!
        const instance = new (service.type.bind.apply(service.type, params))();
        return instance;
    }
}