import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Throttle } from '@nestjs/throttler';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor( private readonly authService: AuthService) {}

    @Throttle({ default: { limit: 5, ttl: 60000 } })
    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @Throttle({ default: { limit: 5, ttl: 60000 } })
    @Post('login')
    @HttpCode(HttpStatus.CREATED)
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Throttle({ default: { limit: 2, ttl: 60000 } })
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    @HttpCode(HttpStatus.OK)
    getProfile(@Request() req) {
        return {
            message: 'Vous etes connecté',
            user: req.user,
        };
    }
   

}
