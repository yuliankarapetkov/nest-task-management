import { PipeTransform, BadRequestException } from '@nestjs/common';

import { TaskStatus } from './../task-status.enum';

export class TaskStatusValidationPipe implements PipeTransform {
    private readonly _taskStatuses: string[] = Object.keys(TaskStatus).map(key => TaskStatus[key]);

    transform(value: string) {
        if (!this._isStatusValid(value)) {
            throw new BadRequestException(`${value} is not a valid task status.`);
        }

        return value;
    }

    private _isStatusValid(status: string): boolean {
        return this._taskStatuses.some(s => s === status);
    }
}
