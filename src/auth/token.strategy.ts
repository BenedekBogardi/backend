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
    // Try to find a teacher with the token
    const teacher = await this.teachers.findUserByToken(token);
    if (teacher) return teacher;

    // Try to find a student with the token
    const student = await this.students.findUserByToken(token);
    if (student) return student;

    // If neither exists, throw an error
    throw new UnauthorizedException('Invalid token');
  }
}
