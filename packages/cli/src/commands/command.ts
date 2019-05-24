import { Action } from "../actions/action";
import { CommanderStatic } from "commander";

export abstract class Command {
    constructor(protected readonly action: Action) {
    }

    public abstract register(program: CommanderStatic): void;
}