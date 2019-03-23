import { AbstractAction } from "./abstract.action";
import chalk from 'chalk';


export class NewAction extends AbstractAction {
    public handle(inputs: any[]): void {
        console.log(chalk.green("Creating a new project..."));
    }
}