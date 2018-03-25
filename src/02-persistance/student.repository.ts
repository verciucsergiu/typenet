import { BaseRepository } from './base.repository';
import { Student } from '../03-core';

export class StudentRepository extends BaseRepository<Student> {
    protected type: Function = Student;
}