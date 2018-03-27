import { ParameterType } from './parameter.type';

export class ActionParameter {
    constructor(
        public type: ParameterType,
        public paramIndex: number,
        public parameterName?: string
    ) {
    }
}