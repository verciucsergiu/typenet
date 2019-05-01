import { CommanderStatic } from "commander";
import { AbstractCommand } from "./abstract.command";

export class ServeCommand extends AbstractCommand {
    public register(program: CommanderStatic): void {
        program
            .command('serve', 'Serve typenet project to a given port')
            .alias('s')
            .action(() => {
                this.action.handle([]);
            });
    }

}