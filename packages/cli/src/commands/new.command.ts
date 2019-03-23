import { AbstractCommand } from "./abstract.command";
import { CommanderStatic } from "commander";

export class NewCommand extends AbstractCommand {
    public register(program:  CommanderStatic): void {
        program
            .command('new', 'Creates a new typenet project')
            .alias('n')
            .action(this.action.handle);
    }

}