import { BaseCommandHandlerMetadata } from '../types/base-command-handler.metadata';
import { DependencyContainer } from '../../injector';
import { CQRSContainer } from '../cqrs.container';

export function CommandHandler(metadata: BaseCommandHandlerMetadata) {
    return (target: Function) => {
        DependencyContainer.set({ type: target });
        CQRSContainer.addCommand({
            commandType: metadata.commandType,
            type: target
        });
    };
}