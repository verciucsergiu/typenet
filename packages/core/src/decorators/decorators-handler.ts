/**
 * Used to reverse decorators evaluation. See:
 * http://www.typescriptlang.org/docs/handbook/decorators.html#decorator-evaluation
 */
export class DecoratorHandler {
    private static stack: Array<Function> = Array<Function>();

    public static addDecoratorAction(action: Function): void {
        this.stack.unshift(action);
    }

    public static handle(): void {
        for (const action of this.stack) {
            action();
        }
    }
}