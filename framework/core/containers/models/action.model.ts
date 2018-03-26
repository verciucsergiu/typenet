import { DependencyContainer } from '../../../injector';
import { ControllerContainerModel } from './controller-container.model';

export class Action {
    constructor(
        private contoller: ControllerContainerModel,
        private method: any,
        private urlParams: Array<string>) {
    }

    public executeAction(): any {
        const params: Array<any> = DependencyContainer.resolveClass(this.contoller.controllerName);
        const ctrl: any = this.contoller.contoller.bind.apply(this.contoller.contoller, params);
        const result = new ctrl();
        return result[this.method.name].apply(null, this.urlParams);
    }
}