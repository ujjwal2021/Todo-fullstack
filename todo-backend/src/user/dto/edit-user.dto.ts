import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class EditUserDto {
    @IsEmail()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    firstName?: string;

    @IsString()
    @IsOptional()
    lastName?: string;

    @IsString()
    @IsOptional()
    middleName: string;

    @IsOptional()
    @IsString()
    @MinLength(6)
    username: string;
}