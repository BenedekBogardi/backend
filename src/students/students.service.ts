import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class StudentsService {
  db: PrismaService;

  constructor(db: PrismaService) {
    this.db = db;
  }

  create(createStudentDto: CreateStudentDto) {
    return this.db.student.create({
      data: createStudentDto
    });
  }

  findAll() {
    return this.db.student.findMany();
  }

  findOne(id: number) {
    return this.db.student.findUnique({
      where: {
        id
      }
    });
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
