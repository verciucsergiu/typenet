import { UrlParser } from "../app-container/url-parser.helper";
import { RouteTree } from "./types";

export class ControllersContainer {
    public routesTree: RouteTree = {};

    public addController(route: string, type: Function): void {
        const parsedRoute = UrlParser.parse(route);
        let currentTree = this.routesTree;
        for (const [index, segment] of parsedRoute.entries()) {
            if (this.isParameter(segment)) {
                currentTree.__parameterTree__ = {};
                currentTree = currentTree.__parameterTree__;
            } else {
                currentTree[segment] = currentTree[segment] || {};
                currentTree = currentTree[segment];

                if (index == parsedRoute.length - 1) {
                    currentTree.__controllerType__ = type;
                }
            }

        }
    }

    public resolveControllers(route: string): Function[] {
        let controllerTypes = [];
        const parsedRoute = UrlParser.parse(route);
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

    private isParameter(routeSegment: string): boolean {
        return routeSegment.indexOf('{') !== -1;
    }
}
