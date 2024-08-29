import { IsEmail, isEmail, IsNotEmpty, IsString, isString, MinLength } from "class-validator";

export class RegisterDto{
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @IsString()
    @IsNotEmpty()
    username: string;
}