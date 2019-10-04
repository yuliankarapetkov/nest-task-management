import { ConflictException } from '@nestjs/common';
import { Repository, EntityRepository } from 'typeorm';

import * as bcryptjs from 'bcryptjs';

import { TypeOrmErrorCode } from '../models';
import { AuthCredentialsDto } from './dtos';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async signUp({ username, password }: AuthCredentialsDto): Promise<void> {
        const user = new User();

        user.username = username;
        user.passwordSalt = await bcryptjs.genSalt();
        user.password = await bcryptjs.hash(password, user.passwordSalt);

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

    async signIn({ username, password }: AuthCredentialsDto): Promise<string> {
        const user = await User.findOne({ username });

        if (user && await user.validatePassword(password)) {
            return user.username;
        }

        return null;
    }
}
