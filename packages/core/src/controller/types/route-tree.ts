export interface RouteTreeArray {
    [routeSegment: string]: RouteTree;
}

export type RouteTree = RouteTreeArray & {
    __controllerType__?: Function;
    __parameterTree__?: RouteTree;
}
