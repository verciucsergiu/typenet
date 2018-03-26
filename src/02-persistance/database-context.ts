import { createConnection, Connection } from 'typeorm';
import { DbContext, DbOptions } from '../../framework/database';
import { Student } from '../03-core/domain';

/**
 * Database context is used as a database in the framework
 * and because of that this class is injectable by default as singleton
 */
export class DatabaseContext extends DbContext {
    constructor(options: DbOptions) {
        super(options);
    }
}