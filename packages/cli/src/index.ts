#!/usr/bin/env node

import * as commander from 'commander';
// tslint:disable-next-line: no-duplicate-imports
import { CommanderStatic } from 'commander';
import { CommandsLoader } from './commands/commands.loader';

const bootstrap = () => {
    const program: CommanderStatic = commander;
    CommandsLoader.load(program);
    program.name('typnet');

    program.version(require('../package.json').version, '-v, --version');

    program.parse(process.argv);

    if (!program.args.length) {
        program.outputHelp();
        return;
    }
};

bootstrap();
