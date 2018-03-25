export class Action {
    constructor(
        private method: any,
        private urlParams: Array<string>) {
    }

    public executeAction(): any {
        return this.method.apply(null, this.urlParams);
    }
}