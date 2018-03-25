import { DecoratorHandler, AppContainer } from '../../containers';

export function HttpPatch(route: string) {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        DecoratorHandler.addDecoratorAction(() => {
            AppContainer.addVerbToController('PATCH', route, target, propertyKey);
        });
    };
}