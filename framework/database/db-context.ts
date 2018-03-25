
import { DbOptions } from './options';
import { Connection, createConnection } from 'typeorm';

export class DbContext {
    constructor(private dbOptions: DbOptions) {
    }

    public get database(): Promise<Connection> {
        console.log('create database!');
        return createConnection({
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

    private entitiesDirname(): string {
        let dirname = __dirname;
        dirname = dirname.slice(0, dirname.indexOf('02-persistance'));
        return dirname + '03-core/domain/*.js';
    }
}