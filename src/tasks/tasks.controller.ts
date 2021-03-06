import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';

//Services
import { TasksService } from './tasks.service';

//DTO
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { DeleteResult } from 'typeorm';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    // @Get()
    // getAllTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDto): Task[] {
    //     if(Object.keys(filterDto).length) { //filter
    //         return this.tasksService.getTasksWithFilters(filterDto)
    //     } else { //all
    //         return this.tasksService.getAllTasks();
    //     }
    // }

    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.tasksService.getTaskById(id)
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksService.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTask(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
        return this.tasksService.deleteTask(id)
    }

    // @Patch('/:id/status')
    // updateTaskStatus(
    //     @Param('id') id: string,
    //     @Body('status', TaskStatusValidationPipe) status: TaskStatus
    // ) {
    //     return this.tasksService.updateTaskStatus(id, status)
    // }

}
