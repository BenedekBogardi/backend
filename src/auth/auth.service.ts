import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from 'src/users/register.dto';
import { PrismaService } from 'src/prisma.service';
import { $Enums } from '@prisma/client';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}
  async validateUser(email: string, password: string) {
    const user = await this.userService.findUserByEmail(email);
    if (
      user &&
      user.password === (await bcrypt.compare(password, user.password))
    ) {
      return user;
    }
    return null;
  }
  async login(loginData: LoginDto) {
    const user = await this.userService.findUserByEmail(loginData.email);
    if (!user) {
      return null;
    }
    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);
    return {
      token,
    };
  }

  async register(registerData: RegisterDto) {
    const user = await this.userService.findUserByEmail(registerData.email);
    if (user) {
      throw new ConflictException();
    }
    const hashedPassword = await bcrypt.hash(registerData.password, 10);
    if (hashedPassword) {
      const userData = {
        email: registerData.email,
        password: hashedPassword,
        role: registerData.role,
        firstName: registerData.firstName,
        lastName: registerData.lastName,
      };
      let user;
      if (registerData.role === 'Teacher') {
        user = await this.prisma.user.create({
          data: {
            ...userData,
            teacher: {
              create: {
                Assignment: {
                  create: [],
                },
                hourlyRate: 3000,
                rating: 5,
                subject: 'Compsci',
              },
            },
          },
        });
      } else {
        user = await this.prisma.user.create({
          data: {
            ...userData,
            student: {
              create: {
                studentAssignments: {
                  create: [],
                },
                ageGroup: undefined,
              },
            },
          },
        });
      }
      const payload = { email: registerData.email, sub: user.id };
      const token = this.jwtService.sign(payload);
      return {
        token,
      };
    }
  }

  async self(id: number) {
    return this.userService.getSelf(id);
  }
}
