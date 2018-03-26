import { DependencyContainer } from './dependency.container';
import { InjectProperty } from './inject-property';

export function Inject(type: Function) {
    return (target: any, propertyKey: string, parameterIndex: number) => {
        DependencyContainer.addInjectProperty(new InjectProperty(target.name, parameterIndex, type.name));
    };
}