
import { Connection, createConnection } from 'typeorm';
import { DbOptions } from './options/db-options';

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