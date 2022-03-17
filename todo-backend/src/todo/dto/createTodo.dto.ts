import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTodo{
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    description: string;
}