import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssignmentsModule } from './assignments/assignments.module';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [AssignmentsModule, AuthModule, UsersModule, ChatModule],
  controllers: [AppController],
  providers: [AppService, UsersService, PrismaService, AssignmentsModule],
})
export class AppModule {}
