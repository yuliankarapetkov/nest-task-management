import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

import * as bcryptjs from 'bcryptjs';

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

    async validatePassword(password: string): Promise<boolean> {
        const passwordHash = await bcryptjs.hash(password, this.passwordSalt);
        return this.password === passwordHash;
    }
}
