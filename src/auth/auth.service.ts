import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { AuthCredentialsDto } from './dtos';
import { JwtPayload } from './models';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private _userRepository: UserRepository,
        private _jwtService: JwtService
    ) {}

    signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this._userRepository.signUp(authCredentialsDto);
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ token: string }> {
        const username = await this._userRepository.signIn(authCredentialsDto);

        if (!username) {
            throw new UnauthorizedException('Invalid credentials.');
        }

        const paylod: JwtPayload = { username };
        const token = await this._jwtService.sign(paylod);

        return { token };
    }
}
