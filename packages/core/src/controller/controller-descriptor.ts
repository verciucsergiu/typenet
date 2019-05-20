import { HttpVerb } from "./types";
import { Route } from "../routing/route";
import { MethodTree } from "../routing/tree";
import { RouteParameter } from "../routing/route-parameter";

export class ControllerDescriptor {
    private routesTree: MethodTree = {};

    public add(verb: HttpVerb, route: Route, methodName: string): void {
        let currentTree = this.routesTree;
        for (const [index, routeSegment] of route.entries()) {
            const segment = routeSegment.toString();
            if (routeSegment.isParameter) {
                currentTree.__parameterTree__ = currentTree.__parameterTree__ || {};
                currentTree = currentTree.__parameterTree__;
                currentTree.__parameterName__ = segment;
            } else {
                currentTree[segment] = currentTree[segment] || {};
                currentTree = currentTree[segment];
            }

            if (index === route.length - 1) {
                currentTree[`__${verb.toLowerCase()}__`] = methodName as {};
            }
        }
    }

    public get(verb: HttpVerb, route: Route): { methodName: string, routeParameters: RouteParameter } {
        let currentTree = this.routesTree;
        const routeParameters: RouteParameter = {};
        for (const [index, s] of route.entries()) {
            const segment = s.toString();
            if (currentTree[segment] !== undefined) {
                currentTree = currentTree[segment];
            } else {
                if (currentTree.__parameterTree__ !== undefined) {
                    currentTree = currentTree.__parameterTree__;
                    routeParameters[currentTree.__parameterName__] = index;
                }
            }

            if (index === route.length - 1) {
                return {
                    methodName: currentTree[`__${verb.toLowerCase()}__`] as any,
                    routeParameters: routeParameters
                }
                    || null;
            }
        }
    }
}