import { createConnection, Connection } from 'typeorm';
import { DbContext, DbOptions } from '../../framework/database';
import { Student } from '../03-core/domain';

/**
 * Database context is used to comunicate with a mysql server.
 * Can be injected.
 * The database is registerd as global instance because of the connection with the db made by "typeorm".
 */
export class DatabaseContext extends DbContext {
    constructor(options: DbOptions) {
        super(options);
    }
}