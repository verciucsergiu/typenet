import chalk from 'chalk';
import { which, test, mkdir, cd, exec } from 'shelljs';
import { Action } from './action';
import { settings } from './settings';
import * as ora from 'ora';
import * as figlet from 'figlet';

export class NewAction extends Action {
    public handle(inputs: any[]): void {
        this.checkForGit();
        const directory = inputs[0];
        this.checkIfDirecotryAlreadyExists(directory);
        this.createProject(directory);
    }

    private checkForGit(): void {
        if (!which('git')) {
            console.log(chalk.red('Sorry, this script requires git! Download git from: https://git-scm.com/downloads'));
            process.exit(1);
        }
    }

    private checkIfDirecotryAlreadyExists(direcotry: string): void {
        if (test('-d', direcotry)) {
            console.log(chalk.red(`${direcotry} directory already exits!`));
            process.exit(1);
        }
    }

    private createProject(directory: string): void {
        const spinner = ora({ hideCursor: true, spinner: 'dots', color: 'cyan' });
        spinner.start(chalk.yellow.bold('Creating project\'s directory...'));
        mkdir(directory);
        cd(directory);
        spinner.succeed(chalk.green.bold("Directory created!"));
        spinner.start(chalk.yellow.bold('Fetching the boilerplate.Please wait...'));
        exec('git init', { silent: true });
        exec(`git pull ${settings.boilerpalte.git} ${settings.boilerpalte.branch}`, { silent: true }, (statuscode) => {
            if (statuscode !== 0) {
                spinner.fail(chalk.red.bold(`Something went wrong! Fetching the boilerplate failed with code ${statuscode}!\nPlease try again!`));
                process.exit(1);
            }
            spinner.succeed(chalk.green.bold('Fetching the boilerplate.Completed!'));
            spinner.start(chalk.yellow.bold('Installing dependencies.Please wait...'));
            exec('npm install', { silent: true }, (code) => {
                if (code !== 0) {
                    spinner.fail(chalk.red.bold(`Installing dependencies for ${directory.toUpperCase()} failed with code: "${code}"!Try running npm install again!`));
                    process.exit(1);
                }
                spinner.succeed(chalk.green.bold(`Installing dependencies for ${directory.toUpperCase()} completed!`));
            });
        });
    }
}