import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginDto {
    @IsEmail({}, { message: 'l\'email doit être une adresse email valide' })
    @IsNotEmpty({ message: 'l\'email ne doit pas être vide' })  
    email: string;

    @IsString({ message: 'le mot de passe doit être une chaîne de caractères' })
    @IsNotEmpty({ message: 'le mot de passe ne doit pas être vide' })
    @MinLength(6, { message: 'le mot de passe doit comporter au moins 6 caractères' })  
    password: string;
}