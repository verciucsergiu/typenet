import { Action } from "./action";
import { Loader } from "./utils/loader";
import { Templates } from "./utils/tempaltes";
import * as isValidPath from 'is-valid-path';
import chalk from "chalk";

export class GenerateAction extends Action {
    constructor(private readonly templates: Templates) {
        super();
    }

    public handle(inputs: any[]): void {
        const template = inputs[0];
        const path = inputs[1];
        this.validatePath(path);
        this.templates.generate(template, path);
    }

    private validatePath(path: string): void {
        if (!isValidPath(path)) {
            console.log(chalk.red.bold(`Path: "${path}" is invalid! Please enter a valid path!`));
            process.exit(1);
        }
    }
}