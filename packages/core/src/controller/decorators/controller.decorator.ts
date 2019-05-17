import { AppContainer } from "../../app-container/app-container";
import { DependencyContainer } from "../../injector";
import { ClassDefinition } from "../../app-container/types/class-definition";
import { Route } from "../../app-container/route";

export function Controller(route: string) {
    return (target: ClassDefinition) => {
        if (route) {
            AppContainer.addController(Route.create(route), target);
            DependencyContainer.registerService(target);
        } else {
            throw new Error(`Invalid route for controller: ${target.constructor.name}`);
        }
    };
}