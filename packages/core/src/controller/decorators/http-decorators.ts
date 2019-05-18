import { HttpVerb } from "../types";
import { ApplicationContainer } from "../../application/application-container";
import { ActionResult } from "../http-responses";
import { Observable } from "rxjs";
import { Route } from "../../routing/route";

function createVerbDecorator(verb: HttpVerb) {
    return (route: string) => {
        return <F extends (...args) => ActionResult | Promise<ActionResult> | Observable<ActionResult>>
            (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<F>) => {
            ApplicationContainer.addMethod(verb, Route.create(route), target, propertyKey);
        };
    }
}

export const HttpGet = createVerbDecorator('GET');
export const HttpPost = createVerbDecorator('POST');
export const HttpPut = createVerbDecorator('PUT');
export const HttpDelete = createVerbDecorator('DELETE');
export const HttpPatch = createVerbDecorator('PATCH');