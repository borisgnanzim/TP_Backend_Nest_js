import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Max, MinLength } from "class-validator";


export class CreateUserDto {

    @IsString({ message: 'le nom doit être une chaîne de caractères' })
    @IsNotEmpty({ message: 'le nom ne doit pas être vide' })
    @MinLength(3, { message: 'le nom doit comporter au moins 3 caractères' })    
    @Max(50, { message: 'le nom doit comporter au maximum 50 caractères' })
    name: string;

    @IsNotEmpty({ message: 'le mot de passe ne doit pas être vide' })
    @MinLength(6, { message: 'le mot de passe doit comporter au moins 6 caractères' })    
    @Max(100, { message: 'le mot de passe doit comporter au maximum 100 caractères' })
    password: string;

    @IsEmail({}, { message: 'l\'email doit être une adresse email valide' })
    @IsNotEmpty({ message: 'l\'email ne doit pas être vide' })

    email: string;

    @IsOptional()
    @IsEnum(['user', 'admin'], { message: 'le rôle doit être user ou admin' })
    role?: 'user' | 'admin';
}