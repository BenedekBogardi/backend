import { BadRequestException, Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/teachers')
  async teachers() {
    return this.usersService.findTeachers();
  }

  @Get('teachers/:sTeacherId')
  async getTeacherUserById(
    @Param('sTeacherId', ParseIntPipe) nTeacherId: number
  ){
    const oTeacher = await this.usersService.getTeacherUserById(nTeacherId);
    if (!oTeacher) {
      throw new NotFoundException(`Teacher with ID ${nTeacherId} not found`);
    }

    return oTeacher;
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

  @UseGuards(AuthGuard('jwt'))
  @Get(":id")
  async choosenStudent(@Param('id') id: string) {
    return this.usersService.findStudentById((Number(id)));
  }

  @Post(':studentId/assignments/:assignmentId')
  async assignAssignmentToStudent(@Param('studentId') studentId: number, @Param('assignmentId') assignmentId: number){
    try {
      return await this.usersService.addAssignmentToStudent(Number(studentId), Number(assignmentId));
    } catch (error) {
        throw new BadRequestException(error.message);
    }
  }
}
