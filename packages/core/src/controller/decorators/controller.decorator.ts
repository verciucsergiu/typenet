import { DecoratorHandler } from "../../app-container/decorators-handler";
import { AppContainer } from "../../app-container/app-container";
import { DependencyContainer } from "../../injector";

export function Controller(route: string) {
    return (target: any) => {
        DecoratorHandler.addDecoratorAction(() => {
            AppContainer.addController(route, target);
            DependencyContainer.registerService(target);
        });
    };
}