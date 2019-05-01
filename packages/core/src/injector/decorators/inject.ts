import { DependencyContainer } from '../dependency-container';

/**
 * Delcare a propety that should be injected into the class constructor.
 * Works only whit constructor properties:
 * ```@Injectable()
 * class MyClass {
 * }
 *
 * class Test {
 *      constructor(@Inject(MyClass) myClass: MyClass) {
 *      }
 * }```
 */
export function Inject(type: Function): Function {
    return (target: Function, key: string, index: number) => {
        DependencyContainer.register({
            index: index,
            type: type,
            target: target
        });
    };
}