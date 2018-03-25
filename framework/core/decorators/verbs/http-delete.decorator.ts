import { AppContainer, DecoratorHandler } from '../../containers';

export function HttpDelete(route: string) {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        DecoratorHandler.addDecoratorAction(() => {
            AppContainer.addVerbToController('DELETE', route, target, propertyKey);
        });
    };
}