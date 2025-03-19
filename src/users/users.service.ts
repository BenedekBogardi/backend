import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TeacherProfileDto } from './profile/TeacherProfileDto';
import { $Enums } from '@prisma/client';
import { StudentProfileDto } from './profile/StudentProfile.dto';

@Injectable()
export class UsersService {
    constructor( private readonly prisma: PrismaService) {
    }

    findUserByEmail(email: string) {
        return this.prisma.user.findUnique({
            where: {
                email: email,
            }
        })
    }

    async findTeachers() {
        return this.prisma.user.findMany({
          where: { role: 'Teacher' },
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            role: true,
          },
        });
      }

    async getSelf(id: number) {
        const u = await this.prisma.user.findFirst({
            where: {
                id
            },
            include: {
                teacher: {
                    where: {
                        id
                    },
                    include: {
                        user: {
                            omit: {
                                password: true,
                                id: true
                            }
                        }
                    }
                },
                student: {
                    where: {
                        id
                    },
                    include: {
                        user: {
                            omit: {
                                password: true,
                                id: true
                            }
                        }
                        },
                    }
                }
            
        })

        if (!u) throw new UnauthorizedException
        if (u.role === "Teacher") {
            const teacher: TeacherProfileDto = {
                id: u.id,
                email: u.email,
                firstName: u.firstName,
                lastName: u.lastName,
                subject: u.teacher.subject,
                role: u.role
                
            }
            return teacher
        }
        else {
            const student : StudentProfileDto = {
                id: u.id,
                email: u.email,
                firstName: u.firstName,
                lastName: u.lastName,
                ageGroup: u.student.ageGroup,
                role: u.role

            }
            return student
        }

    }
}
