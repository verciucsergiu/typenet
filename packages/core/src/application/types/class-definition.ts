export interface ClassDefinition extends ClassDefinitionTyped<any> {
}

export interface ClassDefinitionTyped<T> {
    new(...args: any[]): T;
}