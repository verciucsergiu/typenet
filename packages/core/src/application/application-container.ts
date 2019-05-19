import { ControllersContainer } from '../controller/controllers-container';
import { HttpVerb } from '../controller/types';
import { ActionCommand } from '../controller/action.command';
import { ClassDefinition } from './types/class-definition';
import { Route } from '../routing/route';
import { ParameterType } from '../controller/types/parameter.type';
import { DependencyContainer } from '../injector/dependency-container';

export class ApplicationContainer {
    public static controllersContainer = new ControllersContainer();

    public static addController(route: Route, controller: ClassDefinition): void {
        DependencyContainer.registerService(controller);
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