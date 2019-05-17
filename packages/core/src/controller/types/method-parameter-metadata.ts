import { ParameterType } from "../../app-container/types/parameter.type";

export interface MethodParameterMetadata {
    [identifier: string]: MethodParameterDescriptor;
}

export interface MethodParameterDescriptor {
    [index: number]: MethodParameterType;
}

export class MethodParameterType {
    private constructor() { }

    public body?: boolean;
    public parameterName?: string = '';
    public query?: boolean = false;
    public route?: boolean = false;

    public static create(parameterType: ParameterType, parameterName: string = ''): MethodParameterType {
        const type = new MethodParameterType();
        type[parameterType] = true;
        type.parameterName = parameterName;
        return type;
    }
}