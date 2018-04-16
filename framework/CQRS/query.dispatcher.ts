import { IQuery, IQueryResult } from './interfaces';
import { Injectable } from '../injector';
import { CQRSContainer } from './cqrs.container';

@Injectable()
export class QueryDispatcher {
    public dispatch<TQuery extends IQuery, TResult extends IQueryResult>(query: TQuery): TResult {
        const queryHandlerInstance = CQRSContainer.getQueryHandler(query['constructor']);
        const result: TResult = queryHandlerInstance['retrieve'](query);
        return result;
    }

    public async dispatchAsync<TQuery extends IQuery, TResult extends IQueryResult>(query: TQuery): Promise<TResult> {
        const queryHandlerInstance = CQRSContainer.getQueryHandler(query['constructor']);
        const result: TResult = await queryHandlerInstance['retrieve'](query);
        return result;
    }
}