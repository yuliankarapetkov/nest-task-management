import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { AuthCredentialsDto } from './dtos';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private _userRepository: UserRepository
    ) {}

    signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this._userRepository.signUp(authCredentialsDto);
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const username = await this._userRepository.signIn(authCredentialsDto);

        if (!username) {
            throw new UnauthorizedException('Invalid credentials.');
        }
        console.log(username);
    }
}
