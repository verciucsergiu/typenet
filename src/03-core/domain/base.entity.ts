import { PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

export abstract class BaseEntity {

    @PrimaryGeneratedColumn()
    public id: string;
}