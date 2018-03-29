import { Connection, Repository } from 'typeorm';

import { BaseEntity, Student } from '../03-core';
import { DatabaseContext } from './database-context';

export abstract class BaseRepository<T extends BaseEntity> {

    constructor(private context: DatabaseContext) {
    }

    protected abstract get type(): Function;

    public async add<TEntity extends BaseEntity>(entity: TEntity): Promise<TEntity> {
        const dbSet = await this.dbSet();
        return dbSet.save(entity);
    }

    public async getById<TEntity extends BaseEntity>(id: string): Promise<{}> {
        const dbSet = await this.dbSet();
        return dbSet.findOneById(id);
    }

    public async getAll<TEntity extends BaseEntity>(): Promise<Array<{}>> {
        const dbSet = await this.dbSet();
        return dbSet.find({ where: { deleted: false } });
    }

    public async delete<TEntity extends BaseEntity>(entity: TEntity): Promise<void> {
        const dbSet = await this.dbSet();
        dbSet.deleteById(entity.id);
    }

    public async update<TEntity extends BaseEntity>(entity: TEntity): Promise<TEntity> {
        const dbSet = await this.dbSet();
        return dbSet.save(entity);
    }

    private async dbSet(): Promise<Repository<{}>> {
        const conn = await this.context.database;
        const repo = await conn.getRepository(this.type);
        return repo;
    }
}