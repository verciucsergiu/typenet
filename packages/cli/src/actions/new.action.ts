import chalk from 'chalk';

import { AbstractAction } from "./abstract.action";

export class NewAction extends AbstractAction {
    public handle(inputs: any[]): void {
        console.log(chalk.green("Creating a new project..."));
    }
}