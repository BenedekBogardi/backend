/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, UnauthorizedException, UseGuards, Request } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { LoginDto } from './dto/login-dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiHeader, ApiOkResponse, ApiBody, ApiProperty, ApiTags, ApiResponse } from '@nestjs/swagger';

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
  
  @ApiProperty({
    type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'Error'
        },
        subjectTeacher: {
          type: 'string',
          example: "Történelem"
        }
    },
    required: ['name', 'subjectTeacher']
   })
  @ApiTags()
  @ApiBody({
    description: "List all of the teachers.",
  })
  @ApiResponse({ status: 201, description: 'Teacher has been succesfully added.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  /*@ApiHeader({
    name: 'Get all teachers'
  })*/
  //may not be required
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
