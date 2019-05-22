import { ClassDefinition } from "../application/types/class-definition";

export interface Tree<T> {
    [key: string]: T;
}

interface RouteTreeArray extends Tree<RouteTree> {
}

interface MethodTreeArray extends Tree<MethodTree> {
}

export type RouteTree = RouteTreeArray & {
    __controllerType__?: ClassDefinition;
    __parameterTree__?: RouteTree;
    __parameterName___?: string;
};

export type MethodTree = MethodTreeArray & {
    __parameterTree__?: MethodTree;
    __parameterName__?: string;
    __get__?: string;
    __post__?: string
    __put__?: string;
    __delete__?: string;
    __patch__?: string;
};