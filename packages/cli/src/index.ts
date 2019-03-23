#!/usr/bin/env node

import * as commander from 'commander';
import { CommanderStatic } from 'commander';
import { CommandsLoader } from './commands/commands.loader';

const bootstrap = () => {
    const program: CommanderStatic = commander;

    CommandsLoader.load(program);
    program.version(require('../package.json').version, '-v, --version');
    commander.parse(process.argv);

    if(!program.args.length) {
        program.outputHelp();
    }

    process.exit(1);
};

bootstrap();
