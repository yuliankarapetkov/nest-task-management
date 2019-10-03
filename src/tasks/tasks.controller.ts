import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';

import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

import { CreateTaskDto } from './dtos';

@Controller('/tasks')
export class TasksController {
    constructor(
        private _tasksService: TasksService
    ) {}

    @Get()
    getAll(): Task[] {
        return this._tasksService.getAllTasks();
    }

    @Get('/:id')
    getById(@Param('id') id: string): Task {
        return this._tasksService.getTaskById(id);
    }

    @Post()
    create(@Body() createTaskDto: CreateTaskDto): Task {
        return this._tasksService.createTask(createTaskDto);
    }

    @Patch('/:id/status')
    updateStatus(@Param('id') id: string, @Body('status') status: TaskStatus): Task {
        return this._tasksService.updateTaskStatus(id, status);
    }

    @Delete('/:id')
    remove(@Param('id') id: string): void {
        this._tasksService.deleteTask(id);
    }
}
