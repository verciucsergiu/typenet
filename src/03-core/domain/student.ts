import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class Student extends BaseEntity {

    @Column()
    private firstName: string = '';

    @Column()
    private lastName: string = '';

    @Column()
    private class: string = '';

    @Column()
    private deleted?: boolean = false;

    public markAsDeleted(): void {
        this.deleted = true;
    }

    public get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }

}