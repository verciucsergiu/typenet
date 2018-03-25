import { AppContainer, DecoratorHandler } from '../containers';
import { ActionParameter, ParameterType } from '../containers/models';

export function FromBody() {
    return (target: Object, propertyKey: string, parameterIndex: number) => {
        DecoratorHandler.addDecoratorAction(() => {
            AppContainer.addPropertyToMethod(
                target.constructor.name,
                propertyKey,
                new ActionParameter(ParameterType.FromBody, parameterIndex));
        });
    };
}