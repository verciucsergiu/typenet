import { ControllerContainerModel } from './controller-container.model';
import { DependencyContainer } from '../../injector';

export class Action {
    constructor(
        private contoller: ControllerContainerModel,
        private method: any,
        private urlParams: Array<string>) {
    }

    public executeAction(): any {
        const controllerInstance = DependencyContainer.get(this.contoller.contoller);
        return controllerInstance[this.method.name].apply(controllerInstance, this.urlParams);
    }
}