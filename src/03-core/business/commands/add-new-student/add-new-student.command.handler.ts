import { ICommandHandler, CommandHandler } from '../../../../../framework/CQRS';
import { AddNewStudentCommand } from './add-new-student.command';
import { Injectable, Inject } from '../../../../../framework/injector';
import { StudentRepository } from '../../../../02-persistance';
import { Student } from '../../../domain';

@CommandHandler({ commandType: AddNewStudentCommand })
export class AddNewStudentCommandHandler implements ICommandHandler<AddNewStudentCommand> {

    constructor(@Inject(StudentRepository) private repository: StudentRepository) {
    }

    public async handle(command: AddNewStudentCommand): Promise<void> {
        const student: Student = Object.assign(new Student(), command.studentModel);
        await this.repository.add(student);
    }
}