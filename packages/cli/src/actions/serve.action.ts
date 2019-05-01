import { AbstractAction } from "./abstract.action";

export class ServeAction extends AbstractAction {

    public handle(inputs: any[], options?: any[]): void {
        console.log('Path to where we are', process.cwd());
    }

}