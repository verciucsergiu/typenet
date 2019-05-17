import { DependencyContainer } from '../dependency-container';

export function Injectable() {
    return (target: Function) => {
        DependencyContainer.registerService(target);
    };
}