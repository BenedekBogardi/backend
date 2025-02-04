import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, UnauthorizedException, UseGuards, Request } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { LoginDto } from './dto/login-dto';
import { AuthGuard } from '@nestjs/passport';

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


  @Get()
  @UseGuards(AuthGuard('bearer'))
  findAll(@Request() request) {
    console.log(request.user);
    return this.studentsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
      const teacher = await this.studentsService.findOne(+id);
      if (!teacher) throw new NotFoundException('No student with ID ' + id);
  
      return teacher;
    }
  

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(+id, updateStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsService.remove(+id);
  }
}
