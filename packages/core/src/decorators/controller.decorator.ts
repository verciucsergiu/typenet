import { DecoratorHandler } from "./decorators-handler";
import { AppContainer } from "../app-container/app-container";
import { ControllerContainerModel } from "../app-container/types/controller-container.model";
import { DependencyContainer } from "../injector";

export function Controller(route: string) {
    return (target: any) => {
        DecoratorHandler.addDecoratorAction(() => {
            AppContainer.addController(new ControllerContainerModel(target.name, target, route));
            /**
             * Add all controllers as service to be easier to resolve its dependencies.
             * A controller should not be injected!
             */
            DependencyContainer.registerService(target);
        });

    };
}