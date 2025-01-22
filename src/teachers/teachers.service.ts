import { Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TeachersService {
  db: PrismaService;

  constructor(db: PrismaService) {
    this.db = db;
  }

  /*create(createTeacherDto: CreateTeacherDto) {
    return this.db.teacher.create({
      data: createTeacherDto
    });
  }*/

  findAll() {
    return this.db.teacher.findMany();
  }

  findOne(id: number) {
    return this.db.teacher.findUnique({
      where: {
        id
      }
    });
  }

  async update(id: number, updateTeacherDto: UpdateTeacherDto) {
    try {
      return await this.db.teacher.update({
        where: { id },
        data: updateTeacherDto
      });
    } catch {
      return undefined;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} teacher`;
  }
}
