import { UrlHelper } from "../app-container/url-parser.helper";
import { RouteTree, HttpVerb } from "./types";
import { ControllerDescriptor } from "./controller-descriptor";
import { ActionCommand } from "./action.command";
import { NotFoundException } from "../server-exceptions/not-found.exception";
import { ClassDefinition } from "../app-container/types/class-definition";

export class ControllersContainer {
    private readonly routesTree: RouteTree = {};

    private readonly controllerDescriptors: ControllerDescriptor[] = [];

    public addController(route: string, type: ClassDefinition): void {
        const parsedRoute = route != '' ? UrlHelper.parse(route) : [''];
        let currentTree = this.routesTree;
        for (const [index, segment] of parsedRoute.entries()) {
            if (UrlHelper.isParameter(segment)) {
                currentTree.__parameterTree__ = {};
                currentTree = currentTree.__parameterTree__;
            } else {
                currentTree[segment] = currentTree[segment] || {};
                currentTree = currentTree[segment];
            }

            if (index === parsedRoute.length - 1) {
                currentTree.__controllerType__ = type;
            }
        }
    }

    public addMethodDescriptor(verb: HttpVerb, route: string, controllerName: string, methodName: string): void {
        if (!this.controllerDescriptors[controllerName]) {
            this.controllerDescriptors[controllerName] = new ControllerDescriptor();
        }

        const descriptor = this.controllerDescriptors[controllerName];
        descriptor.add(verb, route, methodName);
    }

    public resolveAction(verb: HttpVerb, route: string, body?: any): ActionCommand {
        const controllers = this.resolveControllers(route);
        const actions: ActionCommand[] = [];
        for (const controller of controllers) {
            const descriptor = <ControllerDescriptor>this.controllerDescriptors[controller.controller.name];
            const method = descriptor.get(verb, controller.remainingRoute);

            // BUILD METHOD PARAMETERS
            const parameters = [];
            actions.push(new ActionCommand(controller.controller, method, parameters));
        }

        if (actions.length > 1) {
            throw new Error('Multiple matches for current request!');
        }

        if (actions.length == 0) {
            throw new NotFoundException(`Action for the route "${route}" with method ${verb} was not found!`);
        }

        return actions[0];
    }

    private resolveControllers(route: string): { controller: ClassDefinition, remainingRoute: string }[] {
        let controllerTypes = [];
        const parsedRoute = route != '' ? UrlHelper.parse(route) : [''];
        let currentTree = this.routesTree;

        for (const [index, segment] of parsedRoute.entries()) {
            if (currentTree[segment] !== undefined) {
                if (currentTree[segment].__controllerType__ !== undefined) {
                    controllerTypes.push({ controller: currentTree[segment].__controllerType__, remainingRoute: parsedRoute.slice(index + 1).join('/') });
                }
                currentTree = currentTree[segment];
            } else {
                if (currentTree.__parameterTree__ !== undefined) {
                    currentTree = currentTree.__parameterTree__;
                } else {
                    break;
                }
            }
        }

        return controllerTypes;
    }
}
