import { Action } from "./action";

export class ServeAction extends Action {

    public handle(inputs: any[], options?: any[]): void {
        console.log('Path to where we are', process.cwd());
    }
}