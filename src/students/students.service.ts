import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class StudentsService {
  db: PrismaService;

  constructor(db: PrismaService) {
    this.db = db;
  }

  async create(createStudentDto: CreateStudentDto) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(createStudentDto.password, saltRounds);

    return this.db.student.create({
      data: {
        ...createStudentDto,
        password: hashedPassword,
      }
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
