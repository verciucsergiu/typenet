import { DependencyContainer } from "../injector";
import { ClassDefinition } from "../application/types/class-definition";
import { HttpContext } from "./types/http-context";
import { RouteParameter } from "../routing/route-parameter";
import { MethodParameterType } from "../routing/method-parameter-metadata";
import { ActionResult } from "./http-responses";

export class ActionCommand {

    constructor(
        private readonly controllerFunction: ClassDefinition,
        private readonly methodName: string,
        private readonly routeParameters: RouteParameter,
        private readonly methodParameters: MethodParameterType[]) {
    }

    public async execute(httpContext: HttpContext): Promise<ActionResult> {
        const controllerInstance = DependencyContainer.resolve(this.controllerFunction);
        const params = await this.buildParameters(httpContext);
        return controllerInstance[this.methodName](...params);
    }

    private async buildParameters(httpContext: HttpContext): Promise<any[]> {
        const params = [];
        if (this.methodParameters) {
            for (const parameter of this.methodParameters) {
                if (parameter.route) {
                    const parameterIndexFromRoute = this.routeParameters[parameter.parameterName];
                    const parameterValue = httpContext.url[parameterIndexFromRoute].toString();
                    params.push(parameterValue);
                } else if (parameter.body) {
                    const parameterValue = await httpContext.getBodyAsJson();
                    params.push(parameterValue);
                } else {
                    // TODO: BUILD QUERY PARAMS
                    params.push({});
                }
            }
        }
        return params;
    }
}