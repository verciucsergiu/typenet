import 'reflect-metadata';
import { Core } from './framework/core';
import { DbOptionBuilder, DbOptions } from './framework/database';
import { DatabaseContext } from './src/02-persistance/database-context';
import { StudentRepository } from './src/02-persistance/student.repository';
import { Student } from './src/03-core';
import { Startup } from './src/startup';

const databaseOptions = new DbOptionBuilder();
const options: DbOptions = databaseOptions
    .useMySqlServer()
    .useDatabase('end')
    .useUsername('root')
    .usePassword('root')
    .usePort(3306)
    .build();

const core: Core = new Core();
const database: DatabaseContext = new DatabaseContext(options);
core.useStartup(Startup)
    .useDatabase(database)
    .run();