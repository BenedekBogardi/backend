import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, UnauthorizedException, UseGuards, Request } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { LoginDto } from './dto/login-dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiBadRequestResponse, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Teacher } from './entities/teacher.entity';

@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Post()
  @ApiBody({ type: [CreateTeacherDto] })
  create(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teachersService.create(createTeacherDto);
  }

  @Post('login')
    async login(@Body() loginData: LoginDto) {
      try {
        return await this.teachersService.login(loginData);
      } catch {
        throw new UnauthorizedException("Érvénytelen név v. jelszó!")
      }
    }
  
  
  @Get()
  @ApiBody({
    description: "List all of the teachers.",
  })
  @ApiResponse({ status: 201, description: 'Teacher has been succesfully added.', type: Teacher})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @ApiResponse({ status: 401, description: 'Unauthorized.'})
  @UseGuards(AuthGuard('bearer'))
    findAll(@Request() request) {
      console.log(request.user);
      return this.teachersService.findAll();
    }
    
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const teacher = await this.teachersService.findOne(+id);
    if (!teacher) throw new NotFoundException('No teacher with ID ' + id);

    return teacher;
  }

  @Patch(':id')  
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
  @ApiBadRequestResponse({ description: 'The supplied data was invalid.' })
  async update(@Param('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto) {
    const teacher = await this.teachersService.update(+id, updateTeacherDto);
    if (!teacher) throw new NotFoundException('No teacher with ID ' + id);
 
    return teacher;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teachersService.remove(+id);
  }
}
