import { Injectable, NotFoundException } from '@nestjs/common';

import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';

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

    async getTaskById(id: number) {
        const found = await this.taskRepository.findOne(id);

        if (!found) {
            throw new NotFoundException(`task with ID "${id} not found"`)
        }

        return found
    }


    // getTaskById(id: string): Task {
    //     const found = this.tasks.find(task => task.id === id);
    //     if (!found) {
    //         throw new NotFoundException(`task with ID "${id} not found"`)
    //     }

    //     return found
    // }

    // createTask(createTaskDto: CreateTaskDto): Task {
    //     const { title, description } = createTaskDto

    //     const task: Task = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN
    //     }

    //     this.tasks.push(task)

    //     return task;
    // }

    // updateTaskStatus(id: string, status: TaskStatus): Task {
    //     const task = this.getTaskById(id);
    //     task.status = status;
    //     return task
    // }

    // deleteTask(id: string): void {
    //     const found = this.getTaskById(id);
    //     this.tasks = this.tasks.filter(task => task.id !== found.id)
    // }
}
