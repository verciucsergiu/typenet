import { AppContainer, DecoratorHandler } from '../../containers';

export function HttpPost(route: string) {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        DecoratorHandler.addDecoratorAction(() => {
            AppContainer.addVerbToController('POST', route, target, propertyKey);
        });
    };
}