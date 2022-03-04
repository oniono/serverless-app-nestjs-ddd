import { Module } from '@nestjs/common';
import { AppService } from './application/app.service';
import { AppController } from './interface/app.controller';
import { TodosController } from './interface/todos.controller';

@Module({
  imports: [],
  controllers: [AppController, TodosController],
  providers: [AppService],
})
export class AppModule {}
