import { Injectable, NotFoundException } from '@nestjs/common';

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
        const task = this._tasks.find(t => t.id === id);

        if (!task) {
            throw new NotFoundException(`Task ${id} not found.`);
        }

        return task;
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
        const task = this.getTaskById(id);
        task.status = status;

        return task;
    }

    deleteTask(id: string): void {
        this.getTaskById(id);
        this._tasks = this._tasks.filter(t => t.id !== id);
    }
}
