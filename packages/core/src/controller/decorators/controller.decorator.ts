import { ApplicationContainer } from "../../application/application-container";
import { DependencyContainer } from "../../injector";
import { ClassDefinition } from "../../application/types/class-definition";
import { Route } from "../../routing/route";

export function Controller(route: string) {
    return (target: ClassDefinition) => {
        if (route) {
            ApplicationContainer.addController(Route.create(route), target);
            DependencyContainer.registerService(target);
        } else {
            throw new Error(`Invalid route for controller: ${target.constructor.name}`);
        }
    };
}