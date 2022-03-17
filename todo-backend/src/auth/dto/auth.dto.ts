import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class AuthDto{
    @IsEmail()
    @IsNotEmpty()
    email: string;


    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsOptional()
    @IsString()
    middleName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;
}
export class SignInDto{
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;
    
}