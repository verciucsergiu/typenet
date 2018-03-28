import { StudentModel } from '../../models/student.model';
import { IQuery } from '../../../../../framework/CQRS';

export class GetStudentByIdQuery implements IQuery {
    constructor(public id: string) { }
}