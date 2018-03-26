import { ControllerContainerModel } from '../containers/models';
import { AppContainer, DecoratorHandler } from '../containers';
import { DependencyContainer } from '../../injector';

export function Controller(route: string) {
    return (target: any) => {
        DecoratorHandler.addDecoratorAction(() => {
            AppContainer.addController(new ControllerContainerModel(target.name, target, route));
            /**
             * Add all controllers as service to be easier to resolve its dependencies.
             * A controller should not be injected!
             */
            DependencyContainer.set({ type: target });
        });

    };
}