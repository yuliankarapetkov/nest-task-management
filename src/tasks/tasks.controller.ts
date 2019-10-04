import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';

import { CreateTaskDto, GetTasksFilterDto } from './dtos';
import { TaskStatusValidationPipe } from './pipes';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Controller('/tasks')
export class TasksController {
    constructor(
        private _tasksService: TasksService
    ) {}

    // @Get()
    // @UsePipes(ValidationPipe)
    // getAll(@Query() filterDto: GetTasksFilterDto): Task[] {
    //     return this._tasksService.getTasks(filterDto);
    // }

    @Get('/:id')
    getById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this._tasksService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this._tasksService.createTask(createTaskDto);
    }

    @Patch('/:id/status')
    updateStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus
    ): Promise<Task> {
        return this._tasksService.updateTaskStatus(id, status);
    }

    @Delete('/:id')
    remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this._tasksService.deleteTask(id);
    }
}
