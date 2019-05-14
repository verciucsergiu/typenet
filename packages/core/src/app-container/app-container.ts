import { AppParams } from '../controller/decorators/models/app-params.model';
import { ControllersContainer } from '../controller/controllers-container';
import { HttpVerb } from '../controller/types';
import { ActionCommand } from '../controller/action.command';
import { ActionParameter } from './types/action-parameter.model';

export class AppContainer {
    public static controllersContainer = new ControllersContainer();

    public static settings: AppParams;

    public static addController(route: string, controller: Function): void {
        this.controllersContainer.addController(route, controller);
    }

    public static addMethod(verb: HttpVerb, route: string, method: any, methodName: string): void {
        this.controllersContainer.addMethodDescriptor(verb, route, method.constructor.name, methodName);
    }

    // TODO: REFACTOR FROM BODY & FROM ROUTE DECORATOR HANDLER
    public static addMetadataToControllerMethod(controllerName: string, methodName: string, parameter: ActionParameter): void {
        
    }

    public static getActionCommand(verb: HttpVerb, route: string, body: any): ActionCommand {
        return this.controllersContainer.resolveAction(verb, route, body);
    }
}