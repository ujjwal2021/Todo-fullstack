import { IsOptional, IsString } from "class-validator";

export class UpdateTodo{
    @IsString()
    @IsOptional()
    title: string;

    @IsString()
    @IsOptional()
    description: string;
}