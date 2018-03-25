import { BaseEntity, Student } from '../03-core';
import { DatabaseContext } from './database-context';
import { Connection, Repository } from 'typeorm';

export abstract class BaseRepository<T extends BaseEntity> {

    constructor(private context: DatabaseContext) {
    }

    protected abstract get type(): Function;

    public async add<TEntity extends BaseEntity>(entity: TEntity): Promise<void> {
        const conn = await this.context.database;
        console.log('trying to save entity');
        conn.manager.save(entity);
    }

    public async get<TEntity extends BaseEntity>(id: number): Promise<Student> {
        const conn = await this.context.database;
        return conn.manager.findOneById(Student, id);
    }
}