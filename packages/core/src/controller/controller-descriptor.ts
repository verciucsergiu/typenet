import { MethodTree, HttpVerb } from "./types";
import { Route } from "../app-container/route";

export class ControllerDescriptor {
    private routesTree: MethodTree = {};

    public add(verb: HttpVerb, route: Route, methodName: string): void {
        let currentTree = this.routesTree;
        for(const[index, segment] of route.entries()) {
            if(segment.isParameter) { 
                currentTree.__parameterTree__ = currentTree.__parameterTree__ || {};
                currentTree = currentTree.__parameterTree__;
            } else {
                currentTree[segment.toString()] = currentTree[segment.toString()] || {};
                currentTree = currentTree[segment.toString()];
            }

            if(index === route.length - 1) {
                currentTree[`__${verb.toLowerCase()}__`] = methodName as {};
            }
        }
    }

    public get(verb: HttpVerb, route: Route): string {
        let currentTree = this.routesTree;

        for(const [index, s] of route.entries()) {
            const segment = s.toString();
            if(currentTree[segment] !== undefined) {
                currentTree = currentTree[segment];
            } else {
                if (currentTree.__parameterTree__ !== undefined) {
                    currentTree = currentTree.__parameterTree__;
                }
            }

            if (index == route.length - 1) {
                return currentTree[`__${verb.toLowerCase()}__`] as any || null;
            }
        }
    }
}