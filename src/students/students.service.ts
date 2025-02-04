import { Injectable } from '@nestjs/common';
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
      const student = await this.db.student.findUniqueOrThrow({
        where: {
          email: loginData.email
        }
      });
      if (await bcrypt.hash(await student.password, loginData.password)) {
        const token = randomBytes(32).toString('hex');
        await this.db.token.create({
          data: {
            token,
            student: {
              connect: { id: student.id }
            },
            teacher: null,
          }
        })
        return {
          token: token,
          studentID: student.id,
        }
      } else {
        throw new Error('Invalid password');
      }
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

  async findUserByToken(token: string) {
    const tokenData = await this.db.token.findUnique({
      where: { token },
      include: { student: true }
    })
    if (!tokenData) return null;
    const user = tokenData.student;
    delete user.password;
    
    return user;
  }
}
