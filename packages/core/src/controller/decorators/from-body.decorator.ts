import { DecoratorHandler } from '../../app-container/decorators-handler';
import { AppContainer } from '../../app-container/app-container';
import { ParameterType } from '../../app-container/types/parameter.type';

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