import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor( private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    private generateToken(userId: number, email: string): string {
        const payload = { sub: userId, email };
        return this.jwtService.sign(payload);
    }

    async register(registerDto: RegisterDto) {
        const existingUser = await this.usersService.findByEmail(registerDto.email);
        if (existingUser) {
            throw new BadRequestException('Cet email est déjà utilisé');
        }
        const user = await this.usersService.create(registerDto);
        const token = this.generateToken(user.id, user.email);

        const { password, ...userWithoutPassword } = user; // Exclure le mot de passe

        return {
            user: userWithoutPassword,
            access_token: token
        };
    }
    
    async login(loginDto: LoginDto) {
        const user = await this.usersService.findByEmail(loginDto.email);
        if(!user) {
            throw new UnauthorizedException('Identifiants invalides')
        }
        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Identifiants invalides')
        }
        const token = this.generateToken(user.id, user.email);
        const { password, ...userWithoutPassword } = user; // Exclure le mot de passe

        return {
            user: userWithoutPassword,
            access_token: token
        };
    }
    
}
