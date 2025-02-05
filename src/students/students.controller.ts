import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, UnauthorizedException, UseGuards, Request } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { LoginDto } from './dto/login-dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiHeader } from '@nestjs/swagger';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @Post('login')
  async login(@Body() loginData: LoginDto) {
    try {
      console.log(loginData.password);
      return await this.studentsService.login(loginData);
    } catch {
      throw new UnauthorizedException("Érvénytelen név v. jelszó!")
    }
  }


  @ApiHeader({
          name: 'This lists all students.'
      })
  @Get()
  @UseGuards(AuthGuard('bearer'))
  findAll(@Request() request) {
    console.log(request.user);
    return this.studentsService.findAll();
  }
  
  @ApiHeader({
          name: 'This shows a student with a specific ID, If there is no student with that ID, it throws an error.'
      })
  @Get(':id')
  async findOne(@Param('id') id: string) {
      const teacher = await this.studentsService.findOne(+id);
      if (!teacher) throw new NotFoundException('No student with ID ' + id);
  
      return teacher;
    }
  
    @ApiHeader({
      name: 'This updates a student with a specific ID.'
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(+id, updateStudentDto);
  }

  @ApiHeader({
    name: 'This deletes a student with a specific ID.'
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsService.remove(+id);
  }
}
