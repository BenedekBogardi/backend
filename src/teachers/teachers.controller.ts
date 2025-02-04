import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, UnauthorizedException, UseGuards, Request } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { LoginDto } from './dto/login-dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Post()
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
