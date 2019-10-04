import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateTaskDto, GetTasksFilterDto } from './dtos';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';

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

    // getTaskById(id: string): Task {
    //     const task = this._tasks.find(t => t.id === id);

    //     if (!task) {
    //         throw new NotFoundException(`Task ${id} not found.`);
    //     }

    //     return task;
    // }

    // createTask({ title, description }: CreateTaskDto): Task {
    //     const task: Task = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: TaskStatus.Open
    //     };

    //     this._tasks.push(task);

    //     return task;
    // }

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
