import { ActionContainer } from './action-container.model';

export class ControllerContainerModel {

    private actions: ActionContainer[] = [];

    constructor(
        public controllerName: string,
        public controller?: any,
        public path: string = '') {
    }

    public getAction(routes: Array<string>, verb: string): ActionContainer {
        return this.actions.find((action: ActionContainer) => action.isCurrentRoute(routes, verb));
    }

    public getActionByName(name: string): ActionContainer {
        return this.actions.find((method: ActionContainer) => method.propKey === name);
    }

    public addAction(action: ActionContainer): void {
        this.actions.push(action);
    }
}