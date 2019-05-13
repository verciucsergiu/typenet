import { ControllerMethodReturnType, Ok } from "./http-responses";
import { DependencyContainer } from "../injector";

export class ActionCommand {

    constructor(private controllerFunction: Function, private methodName: string, private methodArguments: any[]) {
    }

    public execute(): ControllerMethodReturnType {
        const controllerInstance = DependencyContainer.resolve(this.controllerFunction);
        return controllerInstance[this.methodName].apply(controllerInstance, this.methodArguments);
    }
}