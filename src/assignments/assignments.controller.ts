import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  Query,
  ParseIntPipe,
  UseInterceptors,
  UploadedFiles,
  Res,
  BadRequestException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Response } from 'express';
import { AssignmentsService } from './assignments.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';

@Controller('assignments')
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFile(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body,
  ) {
    const studentId = Number(body.studentId);
    const assignmentId = Number(body.assignmentId);
    return this.assignmentsService.saveUploadedFiles(
      files,
      studentId,
      assignmentId,
    );
  }

  @Post()
  create(@Body() createAssignmentDto: CreateAssignmentDto) {
    return this.assignmentsService.create(createAssignmentDto);
  }

  @Get(':assignmentId/:studentId/files')
  async getUploadedFiles(
    @Param('assignmentId') assignmentId: number,
    @Param('studentId') studentId: number,
  ) {
    return await this.assignmentsService.getUploadedFile(
      Number(assignmentId),
      Number(studentId),
    );
  }

  @Get(':assignmentId/:studentId/files/:fileName')
  async downloadFile(
    @Param('assignmentId') assignmentId: number,
    @Param('studentId') studentId: number,
    @Param('fileName') fileName: string,
    @Res() res: Response,
  ) {
    const file = await this.assignmentsService.getFileById(
      Number(assignmentId),
      Number(studentId),
      fileName,
    );

    if (!file) {
      throw new NotFoundException('File not found');
    }

    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${file.fileName}"`,
    );
    res.setHeader('Content-Type', file.fileType);
    res.end(file.fileData);
  }

  @Get('/files')
  async getAllFiles() {
    return this.assignmentsService.getAllFiles();
  }

  @Get()
  async findAll(@Query('subject') subject?: string) {
    return this.assignmentsService.findAll(subject);
  }

  @Get('/assigned/:studentId')
  async turnIn(@Param('studentId', ParseIntPipe) studentId: number) {
    return this.assignmentsService.getTurnedInTasks(studentId);
  }

  @Get('/assigned')
  async assigned() {
    return this.assignmentsService.getAssigned();
  }

  @Get('/teacherAssigned')
  @UseGuards(AuthGuard('jwt'))
  async getAssignedTasks(@Req() req) {
    const teacherId = req.user.id;
    return this.assignmentsService.getAssignedTasksByTeacher(teacherId);
  }

  @Get('/returned/:teacherId')
  async returned(@Param('teacherId', ParseIntPipe) teacherId: number) {
    return this.assignmentsService.getReturned(teacherId);
  }

  @Patch(':studentId/:assignmentId/complete')
  completeTask(
    @Param('studentId', ParseIntPipe) studentId: number,
    @Param('assignmentId', ParseIntPipe) assignmentId: number,
  ) {
    return this.assignmentsService.completeTask(studentId, assignmentId);
  }

  @Patch(':studentId/:assignmentId/:mark/mark')
  addMark(
    @Param('studentId', ParseIntPipe) studentId: number,
    @Param('assignmentId', ParseIntPipe) assignmentId: number,
    @Param('mark', ParseIntPipe) mark: number,
  ) {
    return this.assignmentsService.addMark(studentId, assignmentId, mark);
  }

  @Get(':studentId/getMark')
  getMarkedAssignments(@Param('studentId', ParseIntPipe) studentId: number) {
    return this.assignmentsService.getMarkedAssignments(studentId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const parsedId = Number(id);
    if (isNaN(parsedId)) {
      throw new BadRequestException(`Invalid ID format: ${id}`);
    }

    const assignment = await this.assignmentsService.findOne(parsedId);
    if (!assignment) throw new NotFoundException('No assignment with ID ' + id);

    return assignment;
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAssignmentDto: UpdateAssignmentDto,
  ) {
    return this.assignmentsService.update(+id, updateAssignmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assignmentsService.remove(+id);
  }
}
