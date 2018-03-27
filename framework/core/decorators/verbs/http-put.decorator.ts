import { DecoratorHandler } from '../decorators-handler';
import { AppContainer } from '../../app-container/app-container';

export function HttpPut(route: string) {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        DecoratorHandler.addDecoratorAction(() => {
            AppContainer.addVerbToController('PUT', route, target, propertyKey);
        });
    };
}