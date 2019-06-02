import { AuthorizationContainer } from '../authorization-container';
import { ClassDefinition } from '@typenet/core/lib/application/types/class-definition';
import { ActionResult } from '@typenet/core';

export function AuthorizeMethod() {
    return <F extends (...args: any[]) => ActionResult>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<F>) => {
        AuthorizationContainer.addMethod(target.constructor, propertyKey);
    };
}

export function AuthorizeController() {
    return (target: ClassDefinition) => {
        AuthorizationContainer.addController(target);
    };
}