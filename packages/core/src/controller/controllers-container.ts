import { UrlHelper } from "../app-container/url-parser.helper";
import { RouteTree, HttpVerb } from "./types";
import { ControllerDescriptor } from "./controller-descriptor";

export class ControllersContainer {
    private readonly routesTree: RouteTree = {};

    private readonly controllerDescriptors: ControllerDescriptor[] = [];

    public addController(route: string, type: Function): void {
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

    private resolveControllers(route: string): Function[] {
        let controllerTypes = [];
        const parsedRoute = route != '' ? UrlHelper.parse(route) : [''];
        let currentTree = this.routesTree;

        for (const segment of parsedRoute) {
            if (currentTree[segment] !== undefined) {
                if (currentTree[segment].__controllerType__ !== undefined) {
                    controllerTypes.push(currentTree[segment].__controllerType__);
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
