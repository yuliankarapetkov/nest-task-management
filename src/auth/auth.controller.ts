import { Controller, Post, Body } from '@nestjs/common';

import { AuthCredentialsDto } from './dtos';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private _authService: AuthService
    ) {}

    @Post('/signup')
    signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this._authService.signUp(authCredentialsDto);
    }
}
