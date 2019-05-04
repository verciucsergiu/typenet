import { ControllerContainerModel } from './controller-container.model';
import { DependencyContainer } from '../../injector';

export class Action {
    constructor(
        private controller: ControllerContainerModel,
        private method: any,
        private urlParams: Array<string>) {
    }

    public executeAction(): any {
        const controllerInstance = DependencyContainer.resolve(this.controller.controller);
        return controllerInstance[this.method.name].apply(controllerInstance, this.urlParams);
    }
}