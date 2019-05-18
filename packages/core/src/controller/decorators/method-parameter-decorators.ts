import { ApplicationContainer } from '../../application/application-container';

export function FromRoute(parameterName: string) {
    return (target: Object, methodName: string, parameterIndex: number) => {
        ApplicationContainer.addMethodParameter(
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
        ApplicationContainer.addMethodParameter(
            target.constructor.name,
            methodName,
            parameterIndex,
            'body'
        );
    };
}

export function FromQuery() {
    return (target: Object, methodName: string, parameterIndex: number) => {
        ApplicationContainer.addMethodParameter(
            target.constructor.name,
            methodName,
            parameterIndex,
            'query'
        );
    };
}