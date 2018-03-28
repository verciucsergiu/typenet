import { StudentModel } from '../../models/student.model';
import { IQueryResult } from '../../../../../framework/CQRS';

export class GetStudentByIdQueryResult implements IQueryResult {
    constructor(public student: StudentModel) {
    }
}