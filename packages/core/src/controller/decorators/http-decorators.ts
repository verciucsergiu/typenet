import { HttpVerb } from "../types";
import { DecoratorHandler } from "../../app-container/decorators-handler";
import { AppContainer } from "../../app-container/app-container";
import { ActionResult } from "../http-responses";
import { Observable } from "rxjs";

function createVerbDecorator(verb: HttpVerb) {
    return (route: string) => {
        return <F extends (...args) => ActionResult | Promise<ActionResult> | Observable<ActionResult>>
            (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<F>) => {
            DecoratorHandler.addDecoratorAction(() => {
                AppContainer.addMethod(verb, route, target, propertyKey);
            });
        };
    }
}

export let HttpGet = createVerbDecorator('GET');
export let HttpPost = createVerbDecorator('POST');
export let HttpPut = createVerbDecorator('PUT');
export let HttpDelete = createVerbDecorator('DELETE');
export let HttpPatch = createVerbDecorator('PATCH');