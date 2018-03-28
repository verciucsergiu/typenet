import { Injectable, Inject } from '../../../../../framework/injector';
import { IQueryHandler, QueryHandler } from '../../../../../framework/CQRS';

import { GetStudentByIdQuery } from './get-student-by-id.query';
import { GetStudentByIdQueryResult } from './get-student-by-id.query.result';
import { StudentRepository } from '../../../../02-persistance';
import { Student } from '../../..';
import { StudentModel } from '../../models/student.model';

@QueryHandler({
    queryType: GetStudentByIdQuery,
    resultType: GetStudentByIdQueryResult
})
export class GetStudentByIdQueryHandler implements IQueryHandler<GetStudentByIdQuery, GetStudentByIdQueryResult> {

    constructor(@Inject(StudentRepository) private repository: StudentRepository) {
    }

    public async retrieve(query: GetStudentByIdQuery): Promise<GetStudentByIdQueryResult> {
        const student: any = await this.repository.getById(query.id);
        const studentMapped: StudentModel = Object.assign(new StudentModel(), student);

        return new GetStudentByIdQueryResult(studentMapped);
    }
}