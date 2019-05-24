import { CommanderStatic } from "commander";
import { Command } from "./command";

export class ServeCommand extends Command {
    public register(program: CommanderStatic): void {
        program
            .command('serve')
            .alias('s')
            .description('Serves the typenet application')
            .action(() => {
                this.action.handle([]);
            });
    }

}