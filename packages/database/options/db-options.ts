import { DbOptionsInterface } from './db-options.interface';

export class DbOptions implements DbOptionsInterface {
    public connectionString: string;
    public username: string;
    public database: string;
    public password: string;
    public dialect: string;
    public port: number;
    public host: string;
    public entitiesFolder: string;

    constructor() {
    }

    public static createInstanceUsingConnectionString(connection: string): DbOptions {
        const option: DbOptions = new DbOptions();
        option.connectionString = connection;
        return option;
    }

    public static createInstanceUsingOptions(data: DbOptionsInterface): DbOptions {
        const option: DbOptions = new DbOptions();
        option.connectionString = null;
        option.username = data.username;
        option.database = data.database;
        option.dialect = data.dialect;
        option.password = data.password;
        option.host = data.host;
        option.port = data.port;
        option.entitiesFolder = data.entitiesFolder;
        return option;
    }
}