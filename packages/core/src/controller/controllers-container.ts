import { RouteTree, HttpVerb } from "./types";
import { ControllerDescriptor } from "./controller-descriptor";
import { ActionCommand } from "./action.command";
import { NotFoundException } from "../server-exceptions/not-found.exception";
import { ClassDefinition } from "../app-container/types/class-definition";
import { Route } from "../app-container/route";

export class ControllersContainer {
    private readonly routesTree: RouteTree = {};

    private readonly controllerDescriptors: ControllerDescriptor[] = [];

    public addController(route: Route, type: ClassDefinition): void {
        let currentTree = this.routesTree;
        for (const [index, routeSegement] of route.entries()) {
            const segment = routeSegement.toString();
            if (routeSegement.isParameter) {
                currentTree.__parameterTree__ = {};
                currentTree = currentTree.__parameterTree__;
            } else {
                currentTree[segment] = currentTree[segment] || {};
                currentTree = currentTree[segment];
            }

            if (index === route.length - 1) {
                currentTree.__controllerType__ = type;
            }
        }
    }

    public addMethodDescriptor(verb: HttpVerb, route: Route, controllerName: string, methodName: string): void {
        if (!this.controllerDescriptors[controllerName]) {
            this.controllerDescriptors[controllerName] = new ControllerDescriptor();
        }

        const descriptor = this.controllerDescriptors[controllerName];
        descriptor.add(verb, route, methodName);
    }

    public resolveAction(verb: HttpVerb, route: Route): ActionCommand {
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
            throw new NotFoundException(`Action for the route "${route.toString()}" with method ${verb} was not found!`);
        }

        return actions[0];
    }

    private resolveControllers(route: Route): { controller: ClassDefinition, remainingRoute: Route }[] {
        let controllerTypes = [];
        let currentTree = this.routesTree;

        for (const [index, routeSegment] of route.entries()) {
            const segment = routeSegment.toString();
            if (currentTree[segment] !== undefined) {
                if (currentTree[segment].__controllerType__ !== undefined) {
                    controllerTypes.push(
                        {
                            controller: currentTree[segment].__controllerType__,
                            remainingRoute: index + 1 != route.length ? route.slice(index + 1) : Route.empty()
                        });
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
