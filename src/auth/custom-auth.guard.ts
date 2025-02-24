import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CustomAuthGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('No token provided.');
    }

    const token = authHeader.split(' ')[1];

    const tokenRecord = await this.prisma.token.findUnique({
      where: { token },
      include: { teacher: true },
    });

    if (!tokenRecord) {
      throw new UnauthorizedException('Invalid token.');
    }

    request.user = tokenRecord.teacher;

    return true;
  }
}
