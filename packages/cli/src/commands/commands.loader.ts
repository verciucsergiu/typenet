import chalk from 'chalk';

import { CommanderStatic } from 'commander';
import { NewCommand } from './new.command';
import { NewAction } from '../actions/new.action';
import { ServeCommand } from './serve.command';
import { ServeAction } from '../actions/serve.action';

export class CommandsLoader {
    public static load(program: CommanderStatic): void {
        new NewCommand(new NewAction()).register(program);
        new ServeCommand(new ServeAction()).register(program);

        console.log("Commands registered!");

        program.on('command:*', () => {
            console.error(chalk.red('Invalid command: %s'), program.args.join(' '));
            console.log('See --help for a list of available commands.');
            //process.exit(1);
        });
    }
}