import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { AuthModule } from './../auth/auth.module';
import { TaskRepository } from './task.repository';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskRepository]),
    AuthModule
  ],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
