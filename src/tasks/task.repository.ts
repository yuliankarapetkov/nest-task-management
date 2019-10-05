import { GetTasksFilterDto } from './dtos/get-tasks-filter.dto';
import { Repository, EntityRepository } from 'typeorm';

import { User } from './../auth/user.entity';
import { CreateTaskDto } from './dtos';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    async getTasks({ status, search }: GetTasksFilterDto): Promise<Task[]> {
        const query = this.createQueryBuilder('task');

        if (status) {
            query.andWhere('task.status = :status', { status });
        }

        if (search) {
            query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: `%${search}%` });
        }

        return await query.getMany();
    }

    async createTask({ title, description }: CreateTaskDto, user: User): Promise<Task> {
        const task = new Task();

        task.title = title;
        task.description = description;
        task.status = TaskStatus.Open;
        task.user = user;

        await task.save();

        delete task.user;

        return task;
    }
}
