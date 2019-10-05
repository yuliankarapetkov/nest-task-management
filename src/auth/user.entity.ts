import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from 'typeorm';

import * as bcryptjs from 'bcryptjs';

import { Task } from '../tasks/task.entity';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    passwordSalt: string;

    @OneToMany(type => Task, task => task.user, { eager: true })
    tasks: Task[];

    async validatePassword(password: string): Promise<boolean> {
        const passwordHash = await bcryptjs.hash(password, this.passwordSalt);
        return this.password === passwordHash;
    }
}
