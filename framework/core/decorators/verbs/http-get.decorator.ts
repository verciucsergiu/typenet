import { DecoratorHandler, AppContainer } from '../../containers';

export function HttpGet(route: string) {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        DecoratorHandler.addDecoratorAction(() => {
            AppContainer.addVerbToController('GET', route, target, propertyKey);
        });
    };
}