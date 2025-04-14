import { Injectable } from '@nestjs/common';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { PrismaService } from 'src/prisma.service';
import { Express } from 'express';

@Injectable()
export class AssignmentsService {
  db: PrismaService;

  constructor(db: PrismaService) {
    this.db = db;
  }

  create(dto: CreateAssignmentDto) {
    return this.db.assignment.create({
      data: dto,
    });
  }

  async saveUploadedFiles(
    files: Express.Multer.File[],
    studentId: number,
    assignmentId: number,
  ) {
    const assignmentExists = await this.db.assignment.findUnique({
      where: { id: assignmentId },
    });

    if (!assignmentExists) {
      throw new Error(`Assignment with ID ${assignmentId} not found`);
    }

    const studentAssignment = await this.db.studentAssignment.findUnique({
      where: {
        studentId_assignmentId: {
          studentId,
          assignmentId,
        },
      },
    });

    if (!studentAssignment) {
      throw new Error(
        `Student ${studentId} is not assigned to Assignment ${assignmentId}`,
      );
    }

    return Promise.all(
      files.map(async (file) => {
        return this.db.studentAssignmentFile.create({
          data: {
            assignmentId,
            studentId,
            fileName: file.originalname,
            fileType: file.mimetype,
            fileData: file.buffer,
            uploadedAt: new Date(),
          },
        });
      }),
    );
  }

  async getUploadedFile(assignmentId: number, studentId: number) {
    const files = await this.db.studentAssignmentFile.findMany({
      where: {
        assignmentId,
        studentId,
      },
      select: {
        fileName: true,
        fileType: true,
        uploadedAt: true,
      },
    });

    if (!files.length) {
      throw new Error('No files found');
    }

    return files;
  }

  async getFileById(assignmentId: number, studentId: number, fileName: string) {
    const file = await this.db.studentAssignmentFile.findFirst({
      where: {
        assignmentId,
        studentId,
        fileName,
      },
      select: {
        fileName: true,
        fileType: true,
        fileData: true,
      },
    });

    if (!file) {
      throw new Error('File not found');
    }

    return file;
  }

  async getAllFiles() {
    return this.db.studentAssignmentFile.findMany({
      select: {
        assignmentId: true,
        studentId: true,
        fileName: true,
        fileType: true,
        uploadedAt: true,
      },
    });
  }  

  async getTurnedInTasks(studentId: number) {
    const assignedTasks = await this.db.assignment.findMany({
      where: {
        students: {
          some: {
            studentId: studentId,
          },
        },
      },
      include: {
        StudentAssignmentFile: {
          where: { studentId: studentId },
        },
      },
    });

    return assignedTasks.map((task) => ({
      ...task,
      turnedIn: task.StudentAssignmentFile.length > 0,
    }));
  }

  getAssigned() {
    return this.db.studentAssignment.findMany({
      include: {
        student: {
          include: { user: true },
        },
        assignment: true,
      },
    });
  }

  getReturned(teacherId: number) {
    return this.db.studentAssignment.findMany({
      where: {
        assignment: {
          teacherId: teacherId
        }
      },
      include: {
        student: true,
        assignment: true,
      }
    });
  }  

  completeTask(studentId: number, assignmentId: number) {
    return this.db.studentAssignment.update({
      where: {
        studentId_assignmentId: {
          studentId,
          assignmentId,
        },
      },
      data: {
        completed: true,
      },
    });
  }

  addMark(studentId: number, assignmentId: number, mark: number) {
    return this.db.studentAssignment.update({
      where: {
        studentId_assignmentId: {
          studentId,
          assignmentId,
        },
      },
      data: {
        mark: mark,
      },
    })
  }

  getMarkedAssignments(studentId: number) {
    return this.db.studentAssignment.findMany({
      where: {
        studentId: studentId,
        mark: {
          gt: 0,
        }
      }
    })
  }

  findAll(subject?: string) {
    return this.db.assignment.findMany({
      where: subject ? { subject } : {},
    });
  }

  findOne(id: number) {
    return this.db.assignment.findUnique({
      where: {
        id: Number(id),
      },
    });
  }

  update(id: number, updateAssignmentDto: UpdateAssignmentDto) {
    return `This action updates a #${id} assignment`;
  }

  remove(id: number) {
    return `This action removes a #${id} assignment`;
  }
}
