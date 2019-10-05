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

    getTasks(getTasksFilterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
        return this._tasksRepository.getTasks(getTasksFilterDto, user);
    }

    async getTaskById(id: number, user: User): Promise<Task> {
        const task = await this._tasksRepository.findOne({ where: { id, userId: user.id } });

        if (!task) {
            throw new NotFoundException(`Task ${id} not found.`);
        }

        return task;
    }

    createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        return this._tasksRepository.createTask(createTaskDto, user);
    }

    async updateTaskStatus(id: number, status: TaskStatus, user: User): Promise<Task> {
        const task = await this.getTaskById(id, user);

        task.status = status;

        await task.save();

        return task;
    }

    async deleteTask(id: number, user: User): Promise<void> {
        const { affected } = await this._tasksRepository.delete({ id, userId: user.id });

        if (!affected) {
            throw new NotFoundException(`Task ${id} not found.`);
        }
    }
}
