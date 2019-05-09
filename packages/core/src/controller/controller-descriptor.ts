import { MethodTree, HttpVerb } from "./types";
import { UrlHelper } from "../app-container/url-parser.helper";

export class ControllerDescriptor {
    private routesTree: MethodTree = {};

    public add(verb: HttpVerb, route: string, methodName: string): void {
        const parsedRoute = route != '' ? UrlHelper.parse(route) : [''];
        let currentTree = this.routesTree;
        for(const[index, segment] of parsedRoute.entries()) {
            if(UrlHelper.isParameter(segment)) { 
                currentTree.__parameterTree__ = currentTree.__parameterTree__ || {};
                currentTree = currentTree.__parameterTree__;
            } else {
                currentTree[segment] = currentTree[segment] || {};
                currentTree = currentTree[segment];
            }

            if(index === parsedRoute.length - 1) {
                currentTree[`__${verb.toLowerCase()}__`] = methodName as {};
            }
        }
    }

    public get(verb: HttpVerb, route: string): string {
        const parsedRoute = route != '' ? UrlHelper.parse(route) : [''];
        let currentTree = this.routesTree;

        for(const [index, segment] of parsedRoute.entries()) {
            if(currentTree[segment] !== undefined) {
                currentTree = currentTree[segment];
            } else {
                if (currentTree.__parameterTree__ !== undefined) {
                    currentTree = currentTree.__parameterTree__;
                }
            }

            if (index == parsedRoute.length - 1) {
                return currentTree[`__${verb.toLowerCase()}__`] as any || null;
            }
        }
    }
}