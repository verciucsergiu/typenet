import { HttpVerb } from "./types";
import { ControllerDescriptor } from "./controller-descriptor";
import { ActionCommand } from "./action.command";
import { NotFoundException } from "../server-exceptions/not-found.exception";
import { ClassDefinition } from "../application/types/class-definition";
import { Route } from "../routing/route";
import { RouteParameter } from "../routing/route-parameter";
import { RouteTree, Tree } from "../routing/tree";
import { MethodParameterMetadata, MethodParameterType } from "../routing/method-parameter-metadata";
import { ParameterType } from "./types/parameter.type";

export class ControllersContainer {
    private readonly routesTree: RouteTree = {};

    private readonly controllerDescriptors: Tree<ControllerDescriptor> = {};

    private readonly methodParameters: MethodParameterMetadata[] = [];

    public addController(route: Route, type: ClassDefinition): void {
        let currentTree = this.routesTree;
        for (const [index, routeSegement] of route.entries()) {
            const segment = routeSegement.toString();
            if (routeSegement.isParameter) {
                currentTree.__parameterTree__ = {};
                currentTree = currentTree.__parameterTree__;
                currentTree.__parameterName___ = segment;
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

    public addMethodParameter(controllerName: string, methodName: string, index: number, type: ParameterType, parameterName?: string) {
        const identifier = `${controllerName}.${methodName}`;
        if (!this.methodParameters[identifier]) {
            this.methodParameters[identifier] = [];
        }

        this.methodParameters[identifier][index] = MethodParameterType.create(type, parameterName);
    }

    public resolveAction(verb: HttpVerb, route: Route): ActionCommand {
        const controllers = this.resolveControllers(route);
        const actions: ActionCommand[] = [];
        for (const controller of controllers) {
            const actionOrNothing = this.createAction(controller, verb, route.length);
            if (actionOrNothing) {
                actions.push(actionOrNothing);
            }
        }

        this.validateActions(actions, verb, route);

        return actions[0];
    }

    private resolveControllers(route: Route): PossibleControllerForRoute[] {
        const controllerTypes: PossibleControllerForRoute[] = [];
        let currentTree = this.routesTree;
        const rp: RouteParameter = {};

        for (const [index, routeSegment] of route.entries()) {
            const segment = routeSegment.toString();
            if (currentTree[segment]) {
                currentTree = currentTree[segment];

                if (currentTree.__controllerType__) {
                    controllerTypes.push(this.createPossibleControllerForRoute(currentTree, index, route, rp));
                }
            } else if (currentTree.__parameterTree__) {
                currentTree = currentTree.__parameterTree__;
                rp[currentTree.__parameterName___] = index;

                if (currentTree.__controllerType__) {
                    controllerTypes.push(this.createPossibleControllerForRoute(currentTree, index, route, rp));
                }
            }
        }

        return controllerTypes;
    }

    private createAction(controller: PossibleControllerForRoute, verb: HttpVerb, routeLength: number): ActionCommand {
        const descriptor = this.controllerDescriptors[controller.controller.name] as ControllerDescriptor;
        const method = descriptor.get(verb, controller.remainingRoute);
        if (!method.methodName) {
            return null;
        } else {
            const actionParameters = controller.routeParameters;
            for (const parameter in method.routeParameters) {
                if (method.routeParameters) {
                    method.routeParameters[parameter] = method.routeParameters[parameter] + routeLength - controller.remainingRoute.length;
                }
            }
            return new ActionCommand(
                controller.controller,
                method.methodName,
                { ...method.routeParameters, ...actionParameters },
                this.methodParameters[`${controller.controller.name}.${method.methodName}`]);
        }
    }

    private createPossibleControllerForRoute(currentTree: RouteTree, index: number, route: Route, rp: RouteParameter): PossibleControllerForRoute {
        return {
            controller: currentTree.__controllerType__,
            remainingRoute: this.createRemainingRoute(index, route),
            routeParameters: rp
        };
    }

    private createRemainingRoute(index: number, route: Route): Route {
        return index + 1 !== route.length ? Route.create(route.slice(index + 1)) : Route.empty();
    }

    private validateActions(actions: ActionCommand[], verb: HttpVerb, route: Route): void {
        if (actions.length > 1) {
            throw new Error('Multiple matches for current request!');
        }

        if (actions.length === 0) {
            throw new NotFoundException(`Action for the route "${route.toString()}" with method ${verb} was not found!`);
        }
    }

}

interface PossibleControllerForRoute {
    controller: ClassDefinition;
    remainingRoute: Route;
    routeParameters: RouteParameter;
}