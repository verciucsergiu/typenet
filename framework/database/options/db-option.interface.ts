export interface DbOptionInterface {
    connectionString: string;
    username: string;
    database: string;
    password: string;
    dialect: string;
    port: number;
    host: string;
    entitiesFolder: string;
}