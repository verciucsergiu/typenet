import { DependencyContainer } from '../dependency-container';

/**
 * Decorate a class that can be injected into classes constructors using 'Inject' decorator.
 */
export function Injectable() {
    return (target: Function) => {
        DependencyContainer.registerService(target);
    };
}