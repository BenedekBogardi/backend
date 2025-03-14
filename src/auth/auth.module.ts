import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { authConstants } from './auth.constants';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, UsersService, PrismaService],
  imports: [UsersModule, PassportModule, JwtModule.register({
    secret: authConstants.jwt_secret || "alaptokentest",
    signOptions: {
      expiresIn: "60s",
    }
  })],
})
export class AuthModule {}
