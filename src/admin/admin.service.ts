import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './login-dto';
import { randomBytes } from 'node:crypto';
import { CreateAdminDto } from './dto/create-admin.dto';

@Injectable()
export class AdminService {
    constructor(private readonly db: PrismaService) { }

    async create(createAdmintDto: CreateAdminDto) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(createAdmintDto.password, saltRounds);
    
        const newAdmin = await this.db.admin.create({
          data: {
            ...createAdmintDto,
            role: "Admin",
            password: hashedPassword,
          }
        });
        delete newAdmin.password;
        return newAdmin;
    }
  
    async login(loginData: LoginDto) {
      const admin = await this.db.admin.findUnique({
        where: { email: loginData.email },
      });
      console.log(await bcrypt.compare(loginData.password, admin.password));
      console.log(loginData.password);
      console.log(admin.password);
      if (!admin || !(await bcrypt.compare(loginData.password, admin.password))) {
        throw new UnauthorizedException('Érvénytelen név v. jelszó!');
      }
  
      const token = randomBytes(32).toString('hex');
      await this.db.token.create({
        data: {
          token,
          admin: {
            connect: { id: admin.id },
          }
        },
      });
  
      return {
        token: token,
        adminId: admin.id,
      };
    }
}
