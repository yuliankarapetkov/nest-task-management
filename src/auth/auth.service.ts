import { Injectable } from '@nestjs/common';
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
}
