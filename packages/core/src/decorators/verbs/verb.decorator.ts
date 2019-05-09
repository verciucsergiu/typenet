import { HttpVerb } from "../../controller/types";
import { DecoratorHandler } from "../decorators-handler";
import { AppContainer } from "../../app-container/app-container";

function createVerbDecorator(verb: HttpVerb): any {
    return (route: string): MethodDecorator => {
        return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
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