#!/usr/bin/env node

import * as commander from 'commander';
import { CommanderStatic } from 'commander';
import { CommandsLoader } from './commands/commands.loader';

const bootstrap = () => {
    const program: CommanderStatic = commander;
    
    program.name('typnet');

    CommandsLoader.load(program);
    program.version(require('../package.json').version, '-v, --version');

    const command = commander.parse(process.argv);
    console.log(process.argv);

    if(!program.args.length) {
        program.outputHelp();
        return;
    }
};

bootstrap();
