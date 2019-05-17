import { ControllersContainer } from '../controller/controllers-container';
import { HttpVerb } from '../controller/types';
import { ActionCommand } from '../controller/action.command';
import { ClassDefinition } from './types/class-definition';
import { Route } from './route';
import { ParameterType } from './types/parameter.type';

export class AppContainer {
    public static controllersContainer = new ControllersContainer();
    // TODO: REFACTOR
    public static settings: any;

    public static addController(route: Route, controller: ClassDefinition): void {
        this.controllersContainer.addController(route, controller);
    }

    public static addMethod(verb: HttpVerb, route: Route, methodAsFunction: Function, methodName: string): void {
        this.controllersContainer.addMethodDescriptor(verb, route, methodAsFunction.constructor.name, methodName);
    }

    public static addMethodParameter(controllerName: string, methodName: string, parameterIndex: number, parameterType: ParameterType, parameterName?: string): void {
        this.controllersContainer.addMethodParameter(controllerName, methodName, parameterIndex, parameterType, parameterName);
    }

    public static getActionCommand(verb: HttpVerb, route: Route): ActionCommand {
        return this.controllersContainer.resolveAction(verb, route);
    }
}