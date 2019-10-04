import { ConflictException } from '@nestjs/common';
import { Repository, EntityRepository } from 'typeorm';

import { TypeOrmErrorCode } from '../models';
import { AuthCredentialsDto } from './dtos';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async signUp({ username, password }: AuthCredentialsDto): Promise<void> {
        const user = new User();

        user.username = username;
        user.password = password;

        try {
            await user.save();
        } catch (error) {
            if (error.code === TypeOrmErrorCode.UniqueViolation) {
                throw new ConflictException('Username already exists.');
            } else {
                throw error;
            }
        }
    }
}
