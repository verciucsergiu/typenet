import { Exception } from '../../core/server-exceptions/exception';

export class CommandNotDefinedException extends Exception {
    constructor(message?: string) {
        super(message);
    }
}