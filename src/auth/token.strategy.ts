import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';
import { StudentsService } from 'src/students/students.service';
import { TeachersService } from 'src/teachers/teachers.service';

@Injectable()
export class TokenStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly teachers: TeachersService,
    private readonly students: StudentsService
  ) {
    super();
  }

  async validate(token: string) {
    const teacher = await this.teachers.findUserByToken(token);
    if (teacher) return { user: teacher, role: 'teacher' };

    const student = await this.students.findUserByToken(token);
    if (student) return { user: student, role: 'student' };

    throw new UnauthorizedException('Invalid token');
  }
}
