import { ParameterType } from './parameter.type';

export interface ActionParameter {
    type: ParameterType;
    parameterIndex: number;
    parameterName?: string;
    parameterType?: Function;
}