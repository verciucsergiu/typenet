import { ClassDefinition } from "./class-definition";

export interface ModuleMetadata {
    imports?: ClassDefinition[];
    controllers?: ClassDefinition[];
    providers?: ClassDefinition[];
}