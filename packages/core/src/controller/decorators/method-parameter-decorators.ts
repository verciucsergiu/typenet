import { AppContainer } from '../../app-container/app-container';

export function FromRoute(parameterName: string) {
    return (target: Object, methodName: string, parameterIndex: number) => {
        AppContainer.addMethodParameter(
            target.constructor.name,
            methodName,
            parameterIndex,
            'route',
            parameterName
        );
    };
}

export function FromBody() {
    return (target: Object, methodName: string, parameterIndex: number) => {
        AppContainer.addMethodParameter(
            target.constructor.name,
            methodName,
            parameterIndex,
            'body'
        );
    };
}

export function FromQuery() {
    return (target: Object, methodName: string, parameterIndex: number) => {
        AppContainer.addMethodParameter(
            target.constructor.name,
            methodName,
            parameterIndex,
            'query'
        );
    };
}