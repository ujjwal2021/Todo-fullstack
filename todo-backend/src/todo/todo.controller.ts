import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { CreateTodo } from './dto/createTodo.dto';
import { UpdateTodo } from './dto/updateTOdo.dto';
import { TodoService } from './todo.service';

@UseGuards(JwtGuard)
@Controller('todo')
export class TodoController {
    constructor(private todoService: TodoService){}

    @Get()
    getTodos(@GetUser('id') userId: number){
        return this.todoService.getTodos(userId);
    }

    @Get(':id')
    getTodoById(@GetUser("id") userId: number, @Param('id', ParseIntPipe) todoId: number){
        return this.todoService.getTodoById(userId, todoId);
    }

    @Post()
    createTodo(
      @GetUser('id') userId: number,
      @Body() dto: CreateTodo,
    ) {
      return this.todoService.createTodo(
        userId,
        dto,
      );
    }
  
    @Patch(':id')
    editTodoById(
      @GetUser('id') userId: number,
      @Param('id', ParseIntPipe) TodoId: number,
      @Body() dto: UpdateTodo,
    ) {
      return this.todoService.editTodoById(
        userId,
        TodoId,
        dto,
      );
    }
  
    @HttpCode(HttpStatus.OK)
    @Delete(':id')
    deleteTodoById(
      @GetUser('id') userId: number,
      @Param('id', ParseIntPipe) TodoId: number,
    ) {
      return this.todoService.deleteTodoById(
        userId,
        TodoId,
      );
  }
}
