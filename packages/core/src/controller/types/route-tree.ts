interface Tree<T> {
    [routeSegment: string]: T;
}

interface RouteTreeArray extends Tree<RouteTree> {
}

interface MethodTreeArray extends Tree<MethodTree> {
}

export type RouteTree = RouteTreeArray & {
    __controllerType__?: Function;
    __parameterTree__?: RouteTree;
}

export type MethodTree = MethodTreeArray & {
    __parameterTree__?: MethodTree,
    __get__?: string,
    __post__?: string
    __put__?: string,
    __delete__?: string,
    __patch__?: string,
}