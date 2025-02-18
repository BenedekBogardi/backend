import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, UnauthorizedException, UseGuards, Request, HttpCode } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { LoginDto } from './dto/login-dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiBadRequestResponse, ApiResponse, ApiParam, getSchemaPath, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Student } from './entities/student.entity';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post('create')
  @ApiOperation({ summary: 'Adds a new student' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 201, description: 'Student added succesfully' })
  @ApiBody({ type: CreateStudentDto, description: 'Student object that needs to be added.' })
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Logs student into the system' })
  @ApiParam({
    name: 'password',
    type: 'string',
    description: 'The password of the student.'
  })
  @ApiParam({
    name: 'email',
    type: 'string',
    description: 'The e-mail address of the student.'
  })
  @ApiResponse({ status: 201, description: 'Student has succesfully logged in. Token has been created.', type: LoginDto})
  @ApiResponse({ status: 400, description: 'Invalid input.'})
  @ApiResponse({ status: 401, description: 'Unauthorized.'})
  @ApiBody({ type: LoginDto })
  async login(@Body() loginData: LoginDto) {
    try {
      console.log(loginData.password);
      return await this.studentsService.login(loginData);
    } catch {
      throw new UnauthorizedException("Érvénytelen név v. jelszó!")
    }
  }


  @Get()
  @ApiOperation({ summary: 'List all students' })
  @ApiResponse({ status: 200, description: 'Request OK', type: Student})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @ApiResponse({ status: 401, description: 'Unauthorized.'})
  @ApiOkResponse({type: CreateStudentDto})
  @UseGuards(AuthGuard('bearer'))
  findAll(@Request() request) {
    console.log(request.user);
    return this.studentsService.findAll();
  }
  

  @Get(':id')
  @ApiOperation({ summary: 'Find a student by ID' })
  @ApiResponse({ status: 200, description: 'Request OK', type: Student})
  @ApiResponse({ status: 400, description: 'Invalid input'})
  @ApiResponse({ status: 404, description: 'Not found.'})
  async findOne(@Param('id') id: string) {
      const student = await this.studentsService.findOne(+id);
      if (!student) throw new NotFoundException('No student with ID ' + id);
  
      return student;
    }
  

  @Patch(':id')
  @ApiOperation({ summary: 'Updates a student by ID' })
  @ApiParam({
    name: 'assignmentId',
    type: 'string',
    description: 'The unique ID of the assignment(s) assigned to the student.'
  })
  @ApiParam({
    name: 'password',
    type: 'string',
    description: 'The password of the student.'
  })
  @ApiParam({
    name: 'ageGroup',
    type: 'string',
    description: 'Age group of student, values can be "alsos", "felsos", "kozep_isk" or "felso_okt".'
  })
  @ApiParam({
    name: 'email',
    type: 'string',
    description: 'The e-mail address of the student.'
  })
  @ApiParam({
    name: 'name',
    type: 'string',
    description: 'The full name of the student.'
  })
  @ApiResponse({ status: 200, description: 'The modified data of the student.' })
  @ApiResponse({ status: 400, description: 'Invalid request'})
  @ApiBadRequestResponse({ description: 'The supplied data was invalid.' })
  async update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    const student = await this.studentsService.update(+id, updateStudentDto);
    if (!student) throw new NotFoundException('No student with ID ' + id);
 
    return student;
  }


  @Delete(':id')
  @ApiOperation({ summary: 'Delete a student' })
  @HttpCode(204)
  @ApiResponse({ status: 204, description: 'Student deleted.', type: Student})
  @ApiResponse({ status: 400, description: 'Invalid request'})
  @ApiResponse({ status: 404, description: 'Not found.'})
  async remove(@Param('id') id: string) {
    const success = await this.studentsService.remove(+id);
    if (!success) {
      throw new NotFoundException('No student with ID ' + id);
    }
}
}