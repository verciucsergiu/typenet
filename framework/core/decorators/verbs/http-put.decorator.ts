import { AppContainer, DecoratorHandler } from '../../containers';

export function HttpPut(route: string) {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        DecoratorHandler.addDecoratorAction(() => {
            AppContainer.addVerbToController('PUT', route, target, propertyKey);
        });
    };
}