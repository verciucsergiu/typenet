import { ClassDefinition } from "./class-definition";

export interface ModuleMetadata {
    controllers?: ClassDefinition[];
    providers?: ClassDefinition[];
}