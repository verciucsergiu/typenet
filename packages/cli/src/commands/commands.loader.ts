import { CommanderStatic } from 'commander';
import { NewCommand } from './new.command';
import { NewAction } from '../actions/new.action';
import { ServeCommand } from './serve.command';
import { ServeAction } from '../actions/serve.action';
import { Loader } from '../actions/utils/loader';
import { GenerateCommand } from './generate.command';
import { GenerateAction } from '../actions/generate.action';
import { Templates } from '../actions/utils/tempaltes';

export class CommandsLoader {
    public static load(program: CommanderStatic): void {
        const loader = new Loader();
        const templates = new Templates(loader);

        new ServeCommand(new ServeAction()).register(program);
        new NewCommand(new NewAction(loader)).register(program);
        new GenerateCommand(new GenerateAction(templates)).register(program);

        program
            .command('*')
            .action(() => {
                program.outputHelp();
                process.exit(1);
            });
    }
}