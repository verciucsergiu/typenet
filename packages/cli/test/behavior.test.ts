import { expect } from 'chai';
import 'mocha';

import { CommandsLoader } from '../src/commands/commands.loader';
import * as commander from 'commander';
import chalk from 'chalk';

describe('Command loader', () => {

    it('On serve only serve action should be executed', () => {
        const program = commander;
        // CommandsLoader.load(program);

        program
            .command('serve', 'Serve typenet project to a given port')
            .alias('s')
            .action(function () {
                console.log('serve');
            });
        program
            .command("log")
            .action(() => console.log('log'));

        console.log("Commands registered!");

        program.on('command:*', () => {
            console.error(chalk.red('Invalid command: %s'), program.args.join(' '));
            console.log('See --help for a list of available commands.');
            //process.exit(1);
        });

        program.parse(['node', 'test', 'serve']);
    });

    it('should only serve action', () => {
        const program = commander;
        CommandsLoader.load(program);

        program.parse(['node', 'test', 'serve']);
    });
});