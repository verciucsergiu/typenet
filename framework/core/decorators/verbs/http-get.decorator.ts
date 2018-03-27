import { DecoratorHandler } from '../decorators-handler';
import { AppContainer } from '../../app-container/app-container';

export function HttpGet(route: string) {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        DecoratorHandler.addDecoratorAction(() => {
            AppContainer.addVerbToController('GET', route, target, propertyKey);
        });
    };
}