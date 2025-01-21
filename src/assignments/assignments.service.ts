import { Injectable } from '@nestjs/common';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AssignmentsService {
  db: PrismaService;
  
  constructor(db: PrismaService) {
    this.db = db;
  }
  create(createAssignmentDto: CreateAssignmentDto) {
    return this.db.assignment.create({
      data: createAssignmentDto
    });
  }

  findAll() {
    return this.db.assignment.findMany();
  }

  findOne(id: number) {
    return this.db.assignment.findUnique({
      where: {
        id
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
