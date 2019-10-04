import { Repository, EntityRepository } from 'typeorm';

import { CreateTaskDto } from './dtos';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    async createTask({ title, description }: CreateTaskDto): Promise<Task> {
        const task = new Task();

        task.title = title;
        task.description = description;
        task.status = TaskStatus.Open;

        await task.save();

        return task;
    }
}
