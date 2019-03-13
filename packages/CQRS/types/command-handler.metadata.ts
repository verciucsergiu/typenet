import { BaseCommandHandlerMetadata } from './base-command-handler.metadata';

export interface CommandHandlerMetadata extends BaseCommandHandlerMetadata {
    type?: Function;
}