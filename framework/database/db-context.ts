
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
                this.dbOptions.entitiesFolder
            ],
            synchronize: true
        });
    }

    public get database(): Promise<Connection> {
        return this.connection;
    }
}