import { Controller, Post, Body, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { LoginDto } from './login-dto';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from './admin.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('login')
    async login(@Body() loginData: LoginDto) {
        try {
          console.log(loginData.password);
          return await this.adminService.login(loginData);
        } catch {
          throw new UnauthorizedException("Érvénytelen név v. jelszó!")
        }
      }
}
