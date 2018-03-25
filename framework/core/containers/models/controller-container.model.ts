import { ActionContainer } from './action-container.model';

export class ControllerContainerModel {

    private methods: Array<ActionContainer> = new Array<ActionContainer>();

    constructor(
        public controllerName: string,
        public contoller?: any,
        public path: string = '') {
    }

    public getContollerInstance(): any {
        return new this.contoller();
    }

    public getMethod(routes: Array<string>, verb: string): ActionContainer {
        return this.methods.find((method: ActionContainer) => method.isCurrentRoute(routes, verb));
    }

    public getMethodByName(name: string): ActionContainer {
        return this.methods.find((method: ActionContainer) => method.propKey === name);
    }

    public addMethod(method: ActionContainer): void {
        this.methods.push(method);
    }
}