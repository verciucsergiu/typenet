import { Exception } from '../../core/server-exceptions/exception';

export class QueryNotDefinedException extends Exception {
    constructor(message?: string) {
        super(message);
    }
}