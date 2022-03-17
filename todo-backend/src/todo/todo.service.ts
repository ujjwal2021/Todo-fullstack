import { ForbiddenException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTodo } from './dto/createTodo.dto';

@Injectable()
export class TodoService {
    constructor(
        private prisma: PrismaService
    ){}

    async getTodos(userId: number){
        return await this.prisma.todo.findMany({where: {userId}});
    }

    async getTodoById(userId: number, todoId: number){
        const todo =  await this.prisma.todo.findFirst({where: {
            id: todoId,
             userId
        }});
        if(!todo){
            throw new NotFoundException("Couldnt find todo for given id");
        }
        return todo;
    }

    async createTodo(userId: number, dto: CreateTodo){
        const todo = await this.prisma.todo.create({
            data: {
                userId,
                ...dto
            }
        });
        return todo;
    }

    async editTodoById(userId, TodoId, dto){
        const todo = await this.prisma.todo.findUnique({where: {id: TodoId}});
        if(!todo || todo.userId !== userId){
            throw new ForbiddenException("Access to resources denied");
        };
        await this.prisma.todo.update({where: {id: TodoId}, data: {...dto,}})
        return {
            status: HttpStatus.OK,
            message: "todo updated successfully"
        }
    }

    async deleteTodoById(userId, TodoId){
        const todo = await this.prisma.todo.findUnique({where: {id: TodoId}});
        if(!todo || todo.userId !== userId){
            throw new ForbiddenException("Access to resources denied");
        };
        await this.prisma.todo.delete({where: {id: TodoId}});
        
        return {
            status: HttpStatus.OK,
            message: "todo successfully deleted"
        }
    }
}
