import { DependencyContainer } from '../../injector';
import { CQRSContainer } from '../cqrs.container';
import { BaseQueryHandlerMetadata } from '../types/query-handler-base.metadata';

export function QueryHandler(metadata: BaseQueryHandlerMetadata) {
    return (target: Function) => {
        DependencyContainer.set({ type: target });
        CQRSContainer.addQuery({
            queryType: metadata.queryType,
            resultType: metadata.resultType,
            type: target
        });
    };
}