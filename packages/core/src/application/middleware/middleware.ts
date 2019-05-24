import { ClassDefinition } from "../types/class-definition";
import { METADATA } from "../../metadata/metadata.constants";
import { ApplicationContainer } from "../application-container";
import { HttpContext } from "../types/http-context";
import { DependencyContainer } from "../../injector/dependency-container";

function middleware() {
    return (target: ClassDefinition) => {
        Reflect.defineMetadata(METADATA.MIDDLEWARE, true, target);
        ApplicationContainer.registerMiddleware(target);
        DependencyContainer.registerService(target, 'singleInstance');
    };
}

export interface PipelineMiddleware {
    apply(context: HttpContext, next: Function): void;
}

export const Middleware = middleware;