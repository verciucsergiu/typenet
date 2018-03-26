
import { DbOptions } from './options';
import { Connection, createConnection } from 'typeorm';
import { Student } from '../../src/03-core';

export class DbContext {
    private connection: Promise<Connection>;

    constructor(private dbOptions: DbOptions) {
        this.connection = createConnection({
            type: 'mysql',
            host: this.dbOptions.host,
            port: this.dbOptions.port,
            username: this.dbOptions.username,
            password: this.dbOptions.username,
            database: this.dbOptions.database,
            entities: [
                this.entitiesDirname()
            ],
            synchronize: true
        });
    }

    public get database(): Promise<Connection> {
        return this.connection;
    }

    private entitiesDirname(): string {
        let dirname = __dirname;
        dirname = dirname.slice(0, dirname.indexOf('02-persistance'));
        return dirname + '03-core/domain/*.js';
    }
}