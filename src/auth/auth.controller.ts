import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';

import { AuthCredentialsDto } from './dtos';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private _authService: AuthService
    ) {}

    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this._authService.signUp(authCredentialsDto);
    }
}
