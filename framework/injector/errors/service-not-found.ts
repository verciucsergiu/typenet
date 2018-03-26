/**
 * Thrown when service is not found because is not declared.
 */
export class InjectableNotFound extends Error {

    constructor(type: Function) {
        super(`Cannot find a injectable class of type "${type.name}"`);
    }
}