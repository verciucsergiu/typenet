import { DecoratorHandler } from './decorators-handler';
import { AppContainer } from '../app-container/app-container';
import { ActionParameter } from '../app-container/types/action-parameter.model';
import { ParameterType } from '../app-container/types/parameter.type';

/**
 * Decorate a parameter from a controller action and that parameter will be populated at runtime when a request
 * comes to that specific action and parameter will have the value of the body of the request.
 * @param type the object type that will be given to the property at runtime
 */
export function FromBody(type: Function) {
    return (target: Object, propertyKey: string, parameterIndex: number) => {
        DecoratorHandler.addDecoratorAction(() => {
            AppContainer.addMetadataToControllerMethod(
                target.constructor.name,
                propertyKey,
                {
                    type: ParameterType.FromBody,
                    parameterIndex: parameterIndex,
                    parameterType: type
                });
        });
    };
}