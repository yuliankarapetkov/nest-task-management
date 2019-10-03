import { Injectable } from '@nestjs/common';

import * as uuid from 'uuid/v1';

import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dtos';

@Injectable()
export class TasksService {
    private _tasks: Task[] = [];

    getAllTasks(): Task[] {
        return [...this._tasks];
    }

    getTaskById(id: string): Task {
        return this._tasks.find(task => task.id === id);
    }

    createTask({ title, description }: CreateTaskDto): Task {
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.Open
        };

        this._tasks.push(task);

        return task;
    }
}
