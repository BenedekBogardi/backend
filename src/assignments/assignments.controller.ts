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
} from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('assignments')
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  @Post('/upload')
  @UseInterceptors(FilesInterceptor('files', 10, {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
      },
    }),
  }))
  async uploadFile(
    @UploadedFiles() files: Express.Multer.File[],
    @Body('studentId') studentId: string
  ) {
    if (!files || files.length === 0) {
      throw new Error('No files uploaded');
    }
    
    return this.assignmentsService.saveUploadedFiles(files, Number(studentId));
  }

  @Post()
  create(@Body() createAssignmentDto: CreateAssignmentDto) {
    return this.assignmentsService.create(createAssignmentDto);
  }

  @Get()
  async findAll(@Query('subject') subject?: string) {
    return this.assignmentsService.findAll(subject);
  }

  @Get('/assigned')
  async assigned() {
    return this.assignmentsService.getAssigned();
  }

  @Patch(":studentId/:assignmentId/complete")
  completeTask(@Param('studentId', ParseIntPipe) studentId: number, @Param('assignmentId', ParseIntPipe) assignmentId: number,){
    return this.assignmentsService.completeTask(studentId, assignmentId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const assignment = await this.assignmentsService.findOne(Number(id));
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
