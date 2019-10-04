import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateTaskDto, GetTasksFilterDto } from './dtos';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private _tasksRepository: TaskRepository
    ) {}

    // getTasks({ status, search }: GetTasksFilterDto): Task[] {
    //     let tasks = [...this._tasks];

    //     if (status) {
    //         tasks = tasks.filter(t => t.status === status);
    //     }

    //     if (search) {
    //         search = search.toLowerCase();

    //         tasks = tasks.filter(t =>
    //             t.title.toLowerCase().includes(search) || t.description.toLowerCase().includes(search)
    //         );
    //     }

    //     return tasks;
    // }

    async getTaskById(id: number): Promise<Task> {
        const task = await this._tasksRepository.findOne(id);

        if (!task) {
            throw new NotFoundException(`Task ${id} not found.`);
        }

        return task;
    }

    createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this._tasksRepository.createTask(createTaskDto);
    }

    // updateTaskStatus(id: string, status: TaskStatus): Task {
    //     const task = this.getTaskById(id);
    //     task.status = status;

    //     return task;
    // }

    // deleteTask(id: string): void {
    //     this.getTaskById(id);
    //     this._tasks = this._tasks.filter(t => t.id !== id);
    // }
}
