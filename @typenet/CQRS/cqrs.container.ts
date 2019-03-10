import { CommandHandlerMetadata } from './types/command-handler.metadata';
import { QueryHandlerMetadata } from './types/query-handler.metadata';
import { DependencyContainer } from '../injector';
import { CommandNotDefinedException } from './exceptions/command-not-defined';
import { QueryNotDefinedException } from './exceptions/query-not-defined';

export class CQRSContainer {

    private static commands: Array<CommandHandlerMetadata> = [];

    private static queries: Array<QueryHandlerMetadata> = [];

    public static addQuery(metadata: QueryHandlerMetadata): void {
        this.queries.push(metadata);
    }

    public static addCommand(metadata: CommandHandlerMetadata): void {
        this.commands.push(metadata);
    }

    public static getQueryHandler(queryType: Function): any {
        const queryMetadata: QueryHandlerMetadata =
            this.queries.find((q: QueryHandlerMetadata) => q.queryType === queryType);

        if (!queryMetadata) {
            throw new QueryNotDefinedException(
                `Query: "${queryType.name}" is not defined as a query type to any query handler
                or is not exported by a module (index.ts)!`);
        }
        return DependencyContainer.get(queryMetadata.type);
    }

    public static getCommandHandler(commandType: Function): any {
        const commandMetadata: CommandHandlerMetadata =
            this.commands.find((c: CommandHandlerMetadata) => c.commandType === commandType);

        if (!commandMetadata) {
            throw new CommandNotDefinedException(
                `Command: "${commandType.name}" is not defined as a command type to any command handler
                or is not exported by a module (index.ts)!`);
        }

        return DependencyContainer.get(commandMetadata.type);
    }
}