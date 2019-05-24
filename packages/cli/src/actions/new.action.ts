import chalk from 'chalk';

import { Action } from "./abstract.action";

export class NewAction extends Action {
    public handle(inputs: any[]): void {
        console.log(chalk.green("Creating a new project..."));
    }
}