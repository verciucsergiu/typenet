import { ClassDefinition } from "../../application/types/class-definition";

export class InjectableNotFound extends Error {
    constructor(classDefinition: ClassDefinition) {
        super(`Cannot find a injectable class of type "${classDefinition.name}"`);
    }
}