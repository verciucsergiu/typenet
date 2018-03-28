import { IQuery } from './query.interface';
import { IQueryResult } from './query-result.interface';

export interface IQueryHandler<TQuery extends IQuery, TResult extends IQueryResult> {
    retrieve(query: TQuery): TResult | Promise<TResult>;
}