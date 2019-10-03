import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';

import { Task } from './task.model';
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

    @Delete('/:id')
    remove(@Param('id') id: string): Task {
        return this._tasksService.deleteTask(id);
    }
}
