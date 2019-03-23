import { CommanderStatic } from 'commander';
import { NewCommand } from './new.command';
import { NewAction } from '../actions/new.action';

export class CommandsLoader {
    public static load(program: CommanderStatic): void {
        new NewCommand(new NewAction()).register(program);
    }
}