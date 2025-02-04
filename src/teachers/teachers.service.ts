import { Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login-dto';
import { randomBytes } from 'node:crypto';

@Injectable()
export class TeachersService {

  constructor(private readonly db: PrismaService) { }

  async create(createTeacherDto: CreateTeacherDto) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(createTeacherDto.password, saltRounds);

    const newTeacher = await this.db.teacher.create({
      data: {
        ...createTeacherDto,
        role: 'Teacher',
        password: hashedPassword,
      }
    });
    delete newTeacher.password;
    return newTeacher;
  }

  async login(loginData: LoginDto) {
    const teacher = await this.db.teacher.findUniqueOrThrow({
      where: {
        email: loginData.email
      }
    });
    if (await bcrypt.hash(await teacher.password, loginData.password)) {
      const token = randomBytes(32).toString('hex');
      await this.db.token.create({
        data: {
          token,
          teacher: {
            connect: { id: teacher.id }
          },
          student: null,
        }
      })
      return {
        token: token,
        teacherID: teacher.id,
      }
    } else {
      throw new Error('Invalid password');
    }
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

  async findUserByToken(token: string) {
    const tokenData = await this.db.token.findUnique({
      where: { token },
      include: { teacher: true }
    })
    if (!tokenData) return null;
    const user = tokenData.teacher;
    delete user.password;
    
    return user;
  }
}
