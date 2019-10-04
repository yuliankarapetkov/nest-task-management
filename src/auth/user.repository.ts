import { Repository, EntityRepository } from 'typeorm';

import { AuthCredentialsDto } from './dtos';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async signUp({ username, password }: AuthCredentialsDto): Promise<void> {
        const user = new User();

        user.username = username;
        user.password = password;

        await user.save();
    }
}
