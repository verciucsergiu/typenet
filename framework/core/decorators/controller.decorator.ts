import { ControllerContainerModel } from '../containers/models';
import { AppContainer, DecoratorHandler } from '../containers';

export function Controller(route: string) {
    return (target: any) => {
        DecoratorHandler.addDecoratorAction(() => {
            AppContainer.addController(new ControllerContainerModel(target.name, target, route));
        });
    };
}