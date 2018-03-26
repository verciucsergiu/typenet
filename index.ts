import 'reflect-metadata';
import { Core } from './framework/core';
import { DbOptionBuilder, DbOptions } from './framework/database';
import { Startup } from './src/startup';
import { DatabaseContext } from './src/02-persistance';

const entitiesDirname: string = __dirname + '/src/03-core/domain/*.js';
const databaseOptions = new DbOptionBuilder();
const options: DbOptions = databaseOptions
    .useMySqlServer()
    .useDatabase('end')
    .useUsername('root')
    .usePassword('root')
    .useHost('localhost')
    .usePort(3306)
    .addEnitiesFolder(entitiesDirname)
    .build();

const core: Core = new Core();
core.useStartupClass(Startup)
    .useDatabase(DatabaseContext, new DatabaseContext(options))
    .run();