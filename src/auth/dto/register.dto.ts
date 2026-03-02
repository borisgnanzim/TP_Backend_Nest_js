import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class RegisterDto {
    @IsString({ message: 'le nom doit être une chaîne de caractères' })
    @IsNotEmpty({ message: 'le nom ne doit pas être vide' })
    @MinLength(3, { message: 'le nom doit comporter au moins 3 caractères' })
    @MaxLength(30, { message: 'le nom doit comporter au maximum 30 caractères' })
    name: string;

    @IsEmail({}, { message: 'l\'email doit être une adresse email valide' })
    @IsNotEmpty({ message: 'l\'email ne doit pas être vide' })  
    email: string;

    @IsString({ message: 'le mot de passe doit être une chaîne de caractères' })
    @IsNotEmpty({ message: 'le mot de passe ne doit pas être vide' })
    @MinLength(6, { message: 'le mot de passe doit comporter au moins 6 caractères' })  
    password: string;
    
    @IsOptional()
    @IsEnum(['user', 'admin'], { message: 'le rôle doit être user ou admin' })
    role: 'user' | 'admin';


}