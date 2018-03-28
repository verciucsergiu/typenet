import { StudentModel } from '../../models/student.model';
import { ICommand } from '../../../../../framework/CQRS';

export class AddNewStudentCommand implements ICommand {
    constructor(public studentModel: StudentModel) { }
}