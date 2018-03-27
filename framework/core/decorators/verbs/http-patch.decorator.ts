import { DecoratorHandler } from '../decorators-handler';
import { AppContainer } from '../../app-container/app-container';

export function HttpPatch(route: string) {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        DecoratorHandler.addDecoratorAction(() => {
            AppContainer.addVerbToController('PATCH', route, target, propertyKey);
        });
    };
}