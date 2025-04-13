import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TeacherProfileDto } from './profile/TeacherProfileDto';
import { $Enums } from '@prisma/client';
import { StudentProfileDto } from './profile/StudentProfile.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  selectTeacher(studentId: number, sTeacherId: number) {
    return this.prisma.user.update({
      where: {
        id: Number(studentId),
        role: 'Student',
      },
      data: {
        sTeacherId: Number(sTeacherId),
      },
    });
  }

  async findStudentById(id: number) {
    if (!id) {
      throw new Error('Invalid ID provided');
    }

    const user = await this.prisma.user.findUnique({
      where: { 
        id: id
       },
    });

    if(user.role == "Student"){
      return await this.prisma.user.findUnique({
        where: { 
          id: id
         },
         include: {
          student: true,
         }
      });
    } else if( user.role == "Teacher") {
      return await this.prisma.user.findUnique({
        where: { 
          id: id
         },
         include: {
          teacher: true,
         }
      });
    }
  }

  async addAssignmentToStudent(studentId: number, assignmentId: number) {
    const existingAssignment = await this.prisma.studentAssignment.findFirst({
      where: {
        studentId,
        assignmentId,
      },
    });

    if (existingAssignment) {
      throw new Error(
        'This assignment has already been assigned to the student.',
      );
    }

    return this.prisma.studentAssignment.create({
      data: {
        studentId,
        assignmentId,
        mark: 0,
      },
    });
  }

  async getTeacherUserById(nTeacherId: number){
    return this.prisma.user.findUnique({
      where: {
        id: nTeacherId,
      },
    });
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
        teacher: {
          select: {
            subject: true,
            hourlyRate: true,
            rating: true,
          },
        },
      },
    });
  }

  async rateTeacher(teacherId: number, score: number) {
    if (score < 1 || score > 10) {
      throw new BadRequestException('Nincs kiválasztott értékelés!');
    }

    const teacher = await this.prisma.teacher.findUnique({
      where: { id: teacherId },
    });

    if (!teacher) {
      throw new NotFoundException('Teacher not found');
    }

    const { rating, numberOfRatings } = teacher;
    const newRating = ((rating * numberOfRatings + score) / (numberOfRatings + 1));

    return this.prisma.teacher.update({
      where: { id: teacherId },
      data: {
        rating: newRating,
        numberOfRatings: { increment: 1 },
      },
    });
  }

  async getStudentsForTeacher(teacherId: number) {
    return this.prisma.user.findMany({
      where: {
        role: 'Student',
        sTeacherId: teacherId,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        student: {
          select: {
            ageGroup: true,
          },
        },
      },
    });
  }

  async getSelf(id: number) {
    console.log('Id at get self user service: ', id);
    const u = await this.prisma.user.findFirst({
      where: {
        id: id,
      },
      include: {
        teacher: {
          select: {
            id: true,
            subject: true,
            rating: true,
            numberOfRatings: true,
            user: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
        student: {
          select: {
            id: true,
            ageGroup: true,
            user: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
      },
    });
    console.log('self at user service before if(u.some): ', u.email);
    if (!u) throw new UnauthorizedException();
    if (u.role === 'Teacher') {
      const teacher: TeacherProfileDto = {
        id: u.id,
        email: u.email,
        firstName: u.firstName,
        lastName: u.lastName,
        subject: u.teacher.subject,
        role: u.role,
      };
      console.log('Self at user service (teacher): ', teacher);
      return teacher;
    } else {
      const student: StudentProfileDto = {
        id: u.id,
        email: u.email,
        firstName: u.firstName,
        lastName: u.lastName,
        ageGroup: u.student.ageGroup,
        role: u.role,
        sTeacherId: u.sTeacherId
      };
      console.log('Self at user service (student): ', student);
      return student;
    }
  }
}
