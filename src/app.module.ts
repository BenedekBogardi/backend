import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeachersModule } from './teachers/teachers.module';
import { StudentsModule } from './students/students.module';
import { AssignmentsModule } from './assignments/assignments.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TeachersModule, StudentsModule, AssignmentsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
