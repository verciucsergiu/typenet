import { Controller, HttpGet, HttpPost, FromBody, FromRoute, IActionResult, Ok } from '../../framework/core';
import { DbOptionBuilder, DbOptions } from '../../framework/database';

import { Student } from '../03-core/domain';
import { DatabaseContext } from '../02-persistance/database-context';
import { StudentRepository } from '../02-persistance/student.repository';
import { Inject, DependencyContainer } from '../../framework/injector';

@Controller('api/students')
export class StudentsController {

    constructor(@Inject(StudentRepository) private repository: StudentRepository) {
    }

    @HttpGet('{id}')
    public async getStudentById(@FromRoute('{id}') id: string): Promise<IActionResult> {
        const stud = await this.repository.get(parseInt(id, 10));
        return new Ok(stud);
    }

    @HttpPost('')
    public async addNewStudent(@FromBody() student: Student): Promise<IActionResult> {
        await this.repository.add(student);
        return new Ok();
    }

    @HttpPost('{id}/delete')
    public addNewStudentById(@FromRoute('{id}') id: string, @FromBody() emplyee: Student): IActionResult {
        return new Ok();
    }
}