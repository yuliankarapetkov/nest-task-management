import { IsOptional, IsEnum, IsNotEmpty } from 'class-validator';

import { TaskStatus } from './../task-status.enum';

export class GetTasksFilterDto {
    @IsOptional()
    @IsEnum(TaskStatus)
    status: TaskStatus;

    @IsOptional()
    @IsNotEmpty()
    search: string;
}
