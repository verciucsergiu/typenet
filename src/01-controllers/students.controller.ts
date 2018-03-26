import { Controller, HttpGet, HttpPost, FromBody, FromRoute, IActionResult, Ok } from '../../framework/core';
import { DbOptionBuilder, DbOptions } from '../../framework/database';

import { Student } from '../03-core/domain';
import { DatabaseContext } from '../02-persistance/database-context';
import { StudentRepository } from '../02-persistance/student.repository';
import { Inject, DependencyContainer } from '../../framework/injector';

@Controller('api/students')
export class StudentsController {

    constructor(
        @Inject(DatabaseContext) private context: DatabaseContext,
        @Inject(StudentRepository) private repository: StudentRepository) {
    }

    @HttpGet('{id}')
    public getStudentById(@FromRoute('{id}') id: string): IActionResult {
        DependencyContainer.getClass('DatabaseContext');
        return new Ok('oki');
    }

    @HttpPost('')
    public addNewStudent(@FromBody() emplyee: Student): IActionResult {
        console.log(emplyee.lastName);
        return new Ok();
    }

    @HttpPost('{id}/delete')
    public addNewStudentById(@FromRoute('{id}') id: string, @FromBody() emplyee: Student): IActionResult {
        console.log(emplyee);
        return new Ok();
    }
}