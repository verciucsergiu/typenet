import { AppContainer, DecoratorHandler } from '../containers';
import { ActionParameter, ParameterType } from '../containers/models';

export function FromRoute(parmaName: string) {
    return (target: Object, propertyKey: string, parameterIndex: number) => {
        DecoratorHandler.addDecoratorAction(() => {
            AppContainer.addPropertyToMethod(
                target.constructor.name,
                propertyKey,
                new ActionParameter(ParameterType.FromRoute, parameterIndex, parmaName));
        });
    };
}