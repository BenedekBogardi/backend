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
      data: dto
    })
    ;
  }

  async saveUploadedFiles(files: Express.Multer.File[], studentId: number) {
    return Promise.all(
      files.map(async (file) => {
        return this.db.studentAssignmentFile.create({
          data: {
            studentId,
            fileName: file.originalname,
            fileType: file.mimetype,
            fileData: file.buffer,
            uploadedAt: new Date(),
          },
        });
      })
    );
  }
  
  

  getAssigned() {
    return this.db.studentAssignment.findMany({
      include: {
        student: {
          include: { user: true } 
        },
        assignment: true 
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
  

  findAll(subject?: string) {
    return this.db.assignment.findMany({
      where: subject ? { subject } : {},
    });
  }

  findOne(id: number) {
    return this.db.assignment.findUnique({
      where: {
        id: Number(id)
      }
    });
  }

  update(id: number, updateAssignmentDto: UpdateAssignmentDto) {
    return `This action updates a #${id} assignment`;
  }

  remove(id: number) {
    return `This action removes a #${id} assignment`;
  }
}
