import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, UnauthorizedException, UseGuards, Request, HttpCode } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { LoginDto } from './dto/login-dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiBadRequestResponse, ApiResponse, ApiParam, getSchemaPath, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Teacher } from './entities/teacher.entity';

@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Post()
  @ApiOperation({ summary: 'Adds a new teacher' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 201, description: 'Teacher added succesfully' })
  @ApiBody({ type: CreateTeacherDto, description: 'Teacher object that needs to be added.' })
  create(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teachersService.create(createTeacherDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Logs teacher into the system' })
  @ApiParam({
    name: 'password',
    type: 'string',
    description: 'The password of the teacher.'
  })
  @ApiParam({
    name: 'email',
    type: 'string',
    description: 'The e-mail address of the teacher.'
  })
  @ApiResponse({ status: 201, description: 'Teacher has succesfully logged in. Token has been created.', type: LoginDto})
  @ApiResponse({ status: 400, description: 'Invalid input.'})
  @ApiResponse({ status: 401, description: 'Unauthorized.'})
  @ApiBody({ type: LoginDto })
  async login(@Body() loginData: LoginDto) {
    return await this.teachersService.login(loginData);
  }
  
  
  @Get()
  @ApiOperation({ summary: 'List all teachers' })
  @ApiResponse({ status: 200, description: 'Request OK', type: Teacher})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @ApiResponse({ status: 401, description: 'Unauthorized.'})
  @ApiOkResponse({type: CreateTeacherDto})
  @UseGuards(AuthGuard('bearer'))
    findAll(@Request() request) {
      console.log(request.user);
      return this.teachersService.findAll();
    }
    
  @Get(':id')
  @ApiOperation({ summary: 'Find a teacher by ID' })
  @ApiResponse({ status: 200, description: 'Request OK', type: Teacher})
  @ApiResponse({ status: 400, description: 'Invalid input'})
  @ApiResponse({ status: 404, description: 'Not found.'})
  async findOne(@Param('id') id: string) {
    const teacher = await this.teachersService.findOne(+id);
    if (!teacher) throw new NotFoundException('No teacher with ID ' + id);

    return teacher;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Updates a teacher by ID' })
  @ApiParam({
    name: 'assignmentId',
    type: 'string',
    description: 'The unique ID of the assignment(s) assigned by the teacher.'
  })
  @ApiParam({
    name: 'password',
    type: 'string',
    description: 'The password of the teacher.'
  })
  @ApiParam({
    name: 'rating',
    type: 'string',
    description: 'The rating of the teacher by their students. Value can only be a integer between 1 and 10'
  })
  @ApiParam({
    name: 'numberOfStudents',
    type: 'string',
    description: 'The number of students taught by the teacher.'
  })
  @ApiParam({
    name: 'email',
    type: 'string',
    description: 'The e-mail address of the teacher.'
  })
  @ApiParam({
    name: 'hourlyRate',
    type: 'string',
    description: 'The hourly rate/pricing of the teacher.'
  })
  @ApiParam({
    name: 'subjectTeacher',
    type: 'string',
    description: 'The suject taught by the teacher.'
  })
  @ApiParam({
    name: 'name',
    type: 'string',
    description: 'The full name of the teacher.'
  })
  @ApiResponse({ status: 200, description: 'The modified data of the teacher.' })
  @ApiResponse({ status: 400, description: 'Invalid request'})
  @ApiBadRequestResponse({ description: 'The supplied data was invalid.' })
  async update(@Param('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto) {
    const teacher = await this.teachersService.update(+id, updateTeacherDto);
    if (!teacher) throw new NotFoundException('No teacher with ID ' + id);
 
    return teacher;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a teacher' })
  @HttpCode(204)
  @ApiResponse({ status: 204, description: 'Teacher deleted.', type: Teacher})
  @ApiResponse({ status: 400, description: 'Invalid request'})
  @ApiResponse({ status: 404, description: 'Not found.'})
  async remove(@Param('id') id: string) {
    const success = await this.teachersService.remove(+id);
    if (!success) {
      throw new NotFoundException('No teacher with ID ' + id);
    }
  }
}
