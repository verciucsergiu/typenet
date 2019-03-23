import { AbstractAction } from "../actions/abstract.action";
import { CommanderStatic } from "commander";

export abstract class AbstractCommand {
    constructor(protected readonly action: AbstractAction) {
    }

    public abstract register(program: CommanderStatic): void;
}