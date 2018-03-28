import { Injectable, Inject } from '../../framework/injector';
import { BaseRepository } from './base.repository';
import { Student } from '../03-core';
import { DatabaseContext } from './database-context';

@Injectable()
export class StudentRepository extends BaseRepository<Student> {
    protected type: Function = Student;

    constructor(@Inject(DatabaseContext) context: DatabaseContext) {
        super(context);
    }
}