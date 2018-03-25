export class DbOptions {
    public connectionString: string;
    public username: string;
    public database: string;
    public password: string;
    public dialect: string;
    public port: number;
    public host?: string;

    constructor() {
    }

    public static createInstanceUsingConnectionString(connection: string): DbOptions {
        const option: DbOptions = new DbOptions();
        option.connectionString = connection;
        return option;
    }

    public static createInstanceUsingOptions(
        database: string,
        username: string,
        password: string,
        dialect: string,
        host?: string): DbOptions {

        const option: DbOptions = new DbOptions();
        option.connectionString = null;
        option.username = username;
        option.database = database;
        option.password = password;
        option.host = host;

        return option;
    }
}