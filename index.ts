import 'reflect-metadata';
import { Startup } from './src/startup';
import { DbOptionBuilder, DbOptions } from '@typenet/database';
import { WebApiBuilder } from '@typenet/core';

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

new WebApiBuilder()
    .useStartupClass(Startup)
    .run();