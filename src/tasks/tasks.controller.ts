import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { CreateTaskDto, GetTasksFilterDto } from './dtos';
import { TaskStatusValidationPipe } from './pipes';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Controller('/tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(
        private _tasksService: TasksService
    ) {}

    @Get()
    @UsePipes(ValidationPipe)
    getAll(
        @Query() filterDto: GetTasksFilterDto,
        @GetUser() user: User
    ): Promise<Task[]> {
        return this._tasksService.getTasks(filterDto, user);
    }

    @Get('/:id')
    getById(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User
    ): Promise<Task> {
        return this._tasksService.getTaskById(id, user);
    }

    @Post()
    @UsePipes(ValidationPipe)
    create(
        @Body() createTaskDto: CreateTaskDto,
        @GetUser() user: User
    ): Promise<Task> {
        return this._tasksService.createTask(createTaskDto, user);
    }

    @Patch('/:id/status')
    updateStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus,
        @GetUser() user: User
    ): Promise<Task> {
        return this._tasksService.updateTaskStatus(id, status, user);
    }

    @Delete('/:id')
    remove(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User
    ): Promise<void> {
        return this._tasksService.deleteTask(id, user);
    }
}
