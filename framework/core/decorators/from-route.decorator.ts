import { DecoratorHandler } from './decorators-handler';
import { AppContainer } from '../app-container/app-container';
import { ActionParameter } from '../app-container/types/action-parameter.model';
import { ParameterType } from '../app-container/types/parameter.type';

export function FromRoute(parmaName: string) {
    return (target: Object, propertyKey: string, parameterIndex: number) => {
        DecoratorHandler.addDecoratorAction(() => {
            AppContainer.addMetadataToControllerMethod(
                target.constructor.name,
                propertyKey,
                new ActionParameter(ParameterType.FromRoute, parameterIndex, parmaName));
        });
    };
}