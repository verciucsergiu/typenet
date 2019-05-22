import { ClassDefinition } from "../types/class-definition";
import { METADATA } from "../../metadata/metadata.constants";
import { ApplicationContainer } from "../application-container";
import { HttpContext } from "../types/http-context";

function middlewareDeclaration() {
    return (target: ClassDefinition) => {
        Reflect.defineMetadata(METADATA.MIDDLEWARE, true, target);
        ApplicationContainer.registerMiddleware(target);
    };
}

export interface PipelineMiddleware {
    apply(context: HttpContext, next: Function): void;
}

export const Middleware = middlewareDeclaration;