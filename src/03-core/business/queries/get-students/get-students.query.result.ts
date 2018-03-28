import { StudentModel } from '../../models';
import { IQueryResult } from '../../../../../framework/CQRS';

export class GetStudentsQueryResult implements IQueryResult {
    constructor(public students: Array<StudentModel>) {
    }
}