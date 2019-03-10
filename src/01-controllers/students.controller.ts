import {
    Controller,
    HttpGet,
    FromRoute,
    IActionResult,
    Ok,
    HttpPost,
    FromBody,
    Created
} from '../../framework/core';

import { Student } from '../03-core/domain';
import { Inject } from '../../framework/injector';
import { QueryDispatcher, CommandDispatcher } from '../../framework/CQRS';
import {
    GetStudentByIdQuery,
    GetStudentByIdQueryResult,
    GetStudentsQuery,
    GetStudentsQueryResult
} from '../03-core/business/queries';
import { StudentModel } from '../03-core/business/models/student.model';
import { AddNewStudentCommand } from '../03-core/business/commands';

@Controller('api/students')
export class StudentsController {
    constructor(
        @Inject(QueryDispatcher) private queryDispatcher: QueryDispatcher,
        @Inject(CommandDispatcher) private commandDispatcher: CommandDispatcher) {
    }

    @HttpGet('')
    public async getStudents(): Promise<IActionResult> {
        const query = new GetStudentsQuery();
        const result = await this.queryDispatcher.dispatchAsync<GetStudentsQuery, GetStudentsQueryResult>(query);
        return new Ok(result.students);
    }

    @HttpGet('{id}')
    public async getStudentById(@FromRoute('{id}') id: string): Promise<IActionResult> {
        const query = new GetStudentByIdQuery(id);
        const result = await this.queryDispatcher.dispatchAsync<GetStudentByIdQuery, GetStudentByIdQueryResult>(query);
        return new Ok(result.student);
    }

    @HttpPost('')
    public async addNewStudent(@FromBody(StudentModel) student: StudentModel): Promise<IActionResult> {
        const command = new AddNewStudentCommand(student);
        await this.commandDispatcher.dispatchAsync(command);
        return new Created();
    }

    @HttpPost('{id}/delete')
    public addNewStudentById(@FromRoute('{id}') id: string, @FromBody(Student) emplyee: Student): IActionResult {
        return new Ok();
    }
}