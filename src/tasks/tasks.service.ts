import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './../auth/user.entity';
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

    getTasks(getTasksFilterDto: GetTasksFilterDto): Promise<Task[]> {
        return this._tasksRepository.getTasks(getTasksFilterDto);
    }

    async getTaskById(id: number): Promise<Task> {
        const task = await this._tasksRepository.findOne(id);

        if (!task) {
            throw new NotFoundException(`Task ${id} not found.`);
        }

        return task;
    }

    createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        return this._tasksRepository.createTask(createTaskDto, user);
    }

    async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id);

        task.status = status;

        await task.save();

        return task;
    }

    async deleteTask(id: number): Promise<void> {
        const { affected } = await this._tasksRepository.delete(id);

        if (!affected) {
            throw new NotFoundException(`Task ${id} not found.`);
        }
    }
}
