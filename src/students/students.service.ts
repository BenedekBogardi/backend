import { HttpCode, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login-dto';
import { randomBytes } from 'node:crypto';

@Injectable()
export class StudentsService {

  constructor(private readonly db: PrismaService) { }

  async create(createStudentDto: CreateStudentDto) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(createStudentDto.password, saltRounds);

    const newStudent = await this.db.student.create({
      data: {
        ...createStudentDto,
        role: "Student",
        password: hashedPassword,
      }
    });
    delete newStudent.password;
    return newStudent;
  }

  async login(loginData: LoginDto) {
    if (typeof loginData.email !== 'string' || typeof loginData.password !== 'string') {
      throw new HttpException('Invalid input: email and password must be strings', HttpStatus.BAD_REQUEST);
    }
    const student = await this.db.student.findUnique({
      where: { email: loginData.email },
    });
    console.log((await bcrypt.compare(loginData.password, student.password)));
    if (!student || !(await bcrypt.compare(loginData.password, student.password))) {
      throw new UnauthorizedException('Wrong email or password!');
    }

    const token = randomBytes(32).toString('hex');
    await this.db.token.create({
      data: {
        token,
        student: {
          connect: { id: student.id },
        }
      },
    });

    return {
      token: token,
      studentID: student.id,
    };
  }

  findAll() {
    return this.db.student.findMany();
  }

  findOne(id: number) {
    if (isNaN(id)) {
      throw new HttpException('Invalid ID: must be a number', HttpStatus.BAD_REQUEST);
    }
    return this.db.student.findUnique({
      where: {
        id
      }
    });
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    if (isNaN(id)) {
      throw new HttpException('Invalid ID: must be a number', HttpStatus.BAD_REQUEST);
    }
    try {
      return await this.db.student.update({
        where: { id },
        data: updateStudentDto
      });
    } catch {
      return undefined;
    }
  }

  async remove(id: number) {
    if (isNaN(id)) {
      throw new HttpException('Invalid ID: must be a number', HttpStatus.BAD_REQUEST);
    }
    try {
      return await this.db.student.delete({
        where: {
          id
        }
      })
    } catch {
      return undefined;
    }
  }

  async findUserByToken(token: string) {
    const tokenData = await this.db.token.findUnique({
      where: { token },
      include: { student: true },
    });

    if (!tokenData) return null;
    const user = tokenData.student;
    delete user.password;
    return user;
  }
}
