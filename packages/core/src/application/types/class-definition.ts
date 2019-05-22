export interface ClassDefinition extends ClassDefinitionTyped<any> {
}

export type ClassDefinitionTyped<T> = new(...args: any[]) => T;