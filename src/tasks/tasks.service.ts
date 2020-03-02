import { Injectable, NotFoundException } from '@nestjs/common';

import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';

@Injectable()
export class TasksService {

    constructor( 
        @InjectRepository(TaskRepository) 
        private taskRepository: TaskRepository 
    ) {}

    // private tasks: Task[] = [];

    // getAllTasks() {
    //     return this.tasks.slice();
    // }

    // getTasksWithFilters(filterDto: GetTaskFilterDto) {
    //     const { status, search } = filterDto;

    //     let tasks = this.getAllTasks();

    //     if (status) {
    //         tasks = tasks.filter(task => task.status === status)
    //     }

    //     if (search) {
    //         console.log(search)
    //         tasks = tasks.filter(task => {
    //             task.title.includes(search) || 
    //             task.description.includes(search);
    //         })
    //     }

    //     return tasks;
    // }

    async getTaskById(id: number): Promise<Task> {
        const found = await this.taskRepository.findOne(id);

        if (!found) {
            throw new NotFoundException(`task with ID "${id} not found"`)
        }

        return found
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto)
    }

    // updateTaskStatus(id: string, status: TaskStatus): Task {
    //     const task = this.getTaskById(id);
    //     task.status = status;
    //     return task
    // }

    async deleteTask(id: number): Promise<DeleteResult> {
        const result = await this.taskRepository.delete({id: id});

        if (result.affected === 0) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }

        return result;
    }
}
