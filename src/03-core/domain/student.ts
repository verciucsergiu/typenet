import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class Student extends BaseEntity {

    @Column()
    public firstName: string = '';

    @Column()
    public lastName: string = '';

    @Column()
    public address: string = '';

    @Column()
    public position: string = '';

    @Column()
    public deleted?: boolean = false;

    public markAsDeleted(): void {
        this.deleted = true;
    }

    public get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
}