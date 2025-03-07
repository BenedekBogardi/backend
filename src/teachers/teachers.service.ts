import { HttpCode, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
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
        password: hashedPassword
      }
    });
    delete newTeacher.password;
    return newTeacher;
  }

  async login(loginData: LoginDto) {
    if (typeof loginData.email !== 'string' || typeof loginData.password !== 'string') {
      throw new HttpException('Invalid input: email and password must be strings', HttpStatus.BAD_REQUEST);
    }
    const teacher = await this.db.teacher.findUnique({
      where: { email: loginData.email },
    });
    if (!teacher || !(await bcrypt.compare(loginData.password, teacher.password))) {
      throw new UnauthorizedException('Érvénytelen e-mail cím, vagy jelszó!')
    }

    const token = randomBytes(32).toString('hex');
    await this.db.token.create({
      data: {
        token,
        teacher: {
          connect: { id: teacher.id },
        }
      },
    });

    return {
      token: token,
      teacherId: teacher.id,
    };
  }

  findAll() {
    return this.db.teacher.findMany();
  }

  findOne(id: number) {
    if (isNaN(id)) {
      throw new HttpException('Invalid ID: must be a number', HttpStatus.BAD_REQUEST);
    }
    return this.db.teacher.findUnique({
      where: {
        id
      }
    });
  }

  async update(id: number, updateTeacherDto: UpdateTeacherDto) {
    if (isNaN(id)) {
      throw new HttpException('Invalid ID: must be a number', HttpStatus.BAD_REQUEST);
    }
    try {
      return await this.db.teacher.update({
        where: { id },
        data: {
            ...(updateTeacherDto as any),
            students: {
                connect: updateTeacherDto.connectStudents?.map(studentId => ({ id: studentId })) || [],
            }
        }
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
      return await this.db.teacher.delete({
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
      include: { teacher: true }
    })
    if (!tokenData) return null;
    const user = tokenData.teacher;
    delete user.password;
    
    return user;
  }
}
