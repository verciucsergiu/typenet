import { DependencyContainer } from '.';
import { InjectableClass } from './injectable-class';
import { Scope } from './scope';

export function Injectable(type: Scope) {
    return (target: any) => {
        DependencyContainer.addInjectableClass(new InjectableClass(target.name, target), type);
    };
}