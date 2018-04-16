import { DecoratorHandler } from './decorators-handler';
import { AppContainer } from '../app-container/app-container';
import { ActionParameter } from '../app-container/types/action-parameter.model';
import { ParameterType } from '../app-container/types/parameter.type';

/**
 * Decorate a parameter from a controller action and that parameter will be populated at runtime with
 * a value from the URI parsed by the framework. The value will be a string and if you want it to be a specific type
 * you will have to convert it.
 * @param parameterName a string that represents the name decalre in the verb decorator like : '{id}'
 */
export function FromRoute(parameterName: string) {
    return (target: Object, propertyKey: string, parameterIndex: number) => {
        DecoratorHandler.addDecoratorAction(() => {
            AppContainer.addMetadataToControllerMethod(
                target.constructor.name,
                propertyKey,
                {
                    type : ParameterType.FromRoute,
                    parameterIndex:  parameterIndex,
                    parameterName: parameterName
                }
            );
        });
    };
}