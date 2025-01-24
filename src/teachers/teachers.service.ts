import { Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class TeachersService {
  db: PrismaService;

  constructor(db: PrismaService) {
    this.db = db;
  }

  async create(createTeacherDto: CreateTeacherDto) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(createTeacherDto.password, saltRounds);

    return await this.db.teacher.create({
      data: {
        ...createTeacherDto,
        password: hashedPassword,
      }
    });
  }

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
