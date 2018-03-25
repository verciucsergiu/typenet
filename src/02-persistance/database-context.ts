import { DbContext, DbOptions } from '../../framework/database';
import { Student } from '../03-core/domain';
import { createConnection, Connection } from 'typeorm';

export class DatabaseContext extends DbContext {
    constructor(options: DbOptions) {
        super(options);
    }
}