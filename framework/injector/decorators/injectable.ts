import { DependencyContainer } from '../dependency-container';

/**
 * Declare a class that can be injected into classes constructors using @Inject decorator.
 * @Injectable()
 * class MyClass {
 * }
 *
 * class Test {
 *      constructor(@Inject(MyClass) myClass: MyClass) {
 *      }
 * }
 */
export function Injectable() {
    return (target: Function) => {
        DependencyContainer.set({ type: target });
    };
}