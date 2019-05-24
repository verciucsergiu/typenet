import { Command } from "./command";
import { CommanderStatic } from "commander";

export class NewCommand extends Command {
    public register(program: CommanderStatic): void {
        program
            .command('new <dir>')
            .alias('n')
            .description('Creates a new typenet project to a given directory')
            .action((dir, cmd) => {
                this.action.handle([dir]);
            });
    }

}