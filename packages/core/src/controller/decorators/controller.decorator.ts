import { DecoratorHandler } from "../../app-container/decorators-handler";
import { AppContainer } from "../../app-container/app-container";
import { DependencyContainer } from "../../injector";
import { ClassDefinition } from "../../app-container/types/class-definition";

export function Controller(route: string) {
    return (target: ClassDefinition) => {
        AppContainer.addController(route, target);
        DependencyContainer.registerService(target);
    };
}