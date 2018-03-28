import { ICommand } from './command.interface';

export interface ICommandHandler<TCommand extends ICommand> {
    handle(command: TCommand): void | Promise<void>;
}