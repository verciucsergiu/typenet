export class DecoratorHandler {

    public static addDecoratorAction(action: Function): void {
        this.stack.unshift(action);
    }

    public static handle(): void {
        for (const action of this.stack) {
            action();
        }
    }

    private static stack: Array<Function> = Array<Function>();
}