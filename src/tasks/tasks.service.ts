import { Injectable } from '@nestjs/common';

import * as uuid from 'uuid/v1';

import { Task, TaskStatus } from './task.model';
import { CreateTaskDto, GetTasksFilterDto } from './dtos';

@Injectable()
export class TasksService {
    private _tasks: Task[] = [];

    getTasks({ status, search }: GetTasksFilterDto): Task[] {
        let tasks = [...this._tasks];

        if (status) {
            tasks = tasks.filter(t => t.status === status);
        }

        if (search) {
            search = search.toLowerCase();

            tasks = tasks.filter(t =>
                t.title.toLowerCase().includes(search) || t.description.toLowerCase().includes(search)
            );
        }

        return tasks;
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

    updateTaskStatus(id: string, status: TaskStatus): Task {
        const index = this._tasks.findIndex(t => t.id === id);

        if (index !== -1) {
            const task = this._tasks[index];
            this._tasks[index] = { ...task, status };
            return this._tasks[index];
        }

        return null;
    }

    deleteTask(id: string): void {
        this._tasks = this._tasks.filter(t => t.id !== id);
    }
}
