import 'reflect-metadata';
import { Startup } from './src/index';
import { Core } from './framework/core';
import { DbOptionBuilder, DbOptions } from './framework/database';
import { DatabaseContext } from './src/02-persistance/database-context';
import { StudentRepository } from './src/02-persistance/student.repository';
import { Student } from './src/03-core';

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
const studentRepository: StudentRepository = new StudentRepository(database);
const std = new Student();
std.firstName = 'merge?';
std.lastName = 'merge?';
std.position = 'test123';

studentRepository.add(std);