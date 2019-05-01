import { ActionContainer } from './action-container.model';

export class ControllerContainerModel {

    private actions: Array<ActionContainer> = new Array<ActionContainer>();

    constructor(
        public controllerName: string,
        public contoller?: any,
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