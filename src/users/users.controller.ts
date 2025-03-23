import { Body, Controller, Get, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/teachers')
  async teachers() {
    return this.usersService.findTeachers();
  }

  @Post('/selectTeacher')
  async selectTeacher(@Body() body: { studentId: number; sTeacherId: number}) {
    return this.usersService.selectTeacher(body.studentId, body.sTeacherId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/students')
  async getStudentsForTeacher(@Req() req) {
  if (!req.user) {
    throw new UnauthorizedException('User not found in request');
  }

  const teacherId = req.user.userId;
  return this.usersService.getStudentsForTeacher(teacherId);
  }
}
