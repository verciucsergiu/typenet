import { BaseRepository } from './base.repository';
import { Student } from '../03-core';
import { Injectable, Scope, Inject } from '../../framework/injector';
import { DatabaseContext } from './database-context';

@Injectable(Scope.InstancePerDependency)
export class StudentRepository extends BaseRepository<Student> {
    protected type: Function = Student;

    constructor(@Inject(DatabaseContext) context: DatabaseContext) {
        super(context);
    }
}