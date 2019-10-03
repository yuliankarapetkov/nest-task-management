import { Controller, Get } from '@nestjs/common';

import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('/tasks')
export class TasksController {
    constructor(
        private _tasksService: TasksService
    ) {}

    @Get()
    getAll(): Task[] {
        return this._tasksService.getAllTasks();
    }
}
