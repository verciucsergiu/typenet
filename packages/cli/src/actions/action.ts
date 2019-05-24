export abstract class Action {
    public abstract handle(inputs: any[], options?: any[]): void;
}