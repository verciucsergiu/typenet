import { DecoratorHandler } from '../decorators-handler';
import { AppContainer } from '../../app-container/app-container';

export function HttpPost(route: string) {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        DecoratorHandler.addDecoratorAction(() => {
            AppContainer.addVerbToController('POST', route, target, propertyKey);
        });
    };
}