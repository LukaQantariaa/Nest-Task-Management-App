import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid/v1'

//Models
import { Task, TaskStatus } from './tasks.model';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks() {
        return this.tasks.slice();
    }

    createTask(title: string, description: string): Task {
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        }

        this.tasks.push(task)

        return task;
    }
}
