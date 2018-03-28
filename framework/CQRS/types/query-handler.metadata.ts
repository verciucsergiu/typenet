import { BaseQueryHandlerMetadata } from './query-handler-base.metadata';

export interface QueryHandlerMetadata extends BaseQueryHandlerMetadata {
    type?: Function;
}