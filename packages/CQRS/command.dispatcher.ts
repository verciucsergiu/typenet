import { Injectable } from '../injector';
import { ICommand } from './interfaces';
import { CQRSContainer } from './cqrs.container';

@Injectable()
export class CommandDispatcher {
    public dispatch<TCommand extends ICommand>(command: TCommand): void {
        const commandHandlerInstance = CQRSContainer.getCommandHandler(command['constructor']);
        commandHandlerInstance['handle'](command);
    }

    public async dispatchAsync<TCommand extends ICommand>(command: TCommand): Promise<void> {
        const commandHandlerInstance = CQRSContainer.getCommandHandler(command['constructor']);
        await commandHandlerInstance['handle'](command);
    }
}