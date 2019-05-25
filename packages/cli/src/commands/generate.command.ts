import { Command } from "./command";
import { CommanderStatic } from "commander";

export class GenerateCommand extends Command {
    public register(program: CommanderStatic): void {
        program
            .command('generate <template> <path>')
            .alias('g')
            .description('Generate a module, controller or service.')
            .action((template, path, cmd) => {
                this.action.handle([template, path]);
            });
    }
}