import { AppContainer } from '../../app-container/app-container';
import { ParameterType } from '../../app-container/types/parameter.type';

export function FromRoute(parameterName: string) {
    return (target: Object, propertyKey: string, parameterIndex: number) => {
        AppContainer.addMetadataToControllerMethod(
            target.constructor.name,
            propertyKey,
            {
                type : ParameterType.FromRoute,
                parameterIndex:  parameterIndex,
                parameterName: parameterName
            }
        );
    };
}