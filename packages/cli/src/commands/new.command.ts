import { Command } from "./command";
import { CommanderStatic } from "commander";

export class NewCommand extends Command {
    public register(program: CommanderStatic): void {
        program
            .command('new')
            .alias('n')
            .description('Creates a new typenet project')
            .action(() => {
                this.action.handle([]);
            });
    }

}