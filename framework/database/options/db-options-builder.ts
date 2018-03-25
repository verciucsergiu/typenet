import { DbOptions } from './db-options';

export class DbOptionBuilder {
    private database: string = '';
    private username: string = '';
    private password: string = '';
    private dialect: string = '';
    private port: number;
    private host: string = 'localhost';

    private connectionString: string = null;

    public useDatabase(value: string): DbOptionBuilder {
        this.database = value;
        return this;
    }

    public useUsername(value: string): DbOptionBuilder {
        this.username = value;
        return this;
    }

    public usePassword(value: string): DbOptionBuilder {
        this.password = value;
        return this;
    }

    public useHost(value: string): DbOptionBuilder {
        this.host = value;
        return this;
    }

    public useConnectionString(value: string): DbOptionBuilder {
        this.connectionString = value;
        return this;
    }

    public usePort(value: number): DbOptionBuilder {
        this.port = value;
        return this;
    }

    public useMySqlServer(connectionString?: string): DbOptionBuilder {
        if (connectionString) {
            this.connectionString = connectionString;
        }
        this.dialect = 'mysql';
        return this;
    }

    public build(): DbOptions {
        if (this.connectionString) {
            return DbOptions.createInstanceUsingConnectionString(this.connectionString);
        } else {
            return DbOptions.createInstanceUsingOptions(
                this.database,
                this.username,
                this.password,
                this.database,
                this.host);
        }
    }
}