import { PartialType } from '@nestjs/mapped-types';
import { CreateTeacherDto } from './create-teacher.dto';
import { IsArray, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTeacherDto extends PartialType(CreateTeacherDto) {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: 'Full name of teacher',
        example: 'John Doe'
    })
    name: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: 'The subject being taught by the teacher.',
        example: 'Matematika'
    })
    subjectTeacher: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @ApiProperty({
        description: 'Hourly rate/pricing of the teacher in HUF currency.',
        minimum: 0,
        example: 5000
    })
    hourlyRate: number;

    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({
        description: 'E-mail address of the teacher.',
        example: 'john.doe@example.com'
    })
    email: string;

    @IsOptional()
    @ApiProperty({ description: "List of student IDs to be added to the teacher", example: [1, 2, 3] })
    @IsArray()
    @IsNumber({}, { each: true })
    connectStudents?: number[];

    @IsNotEmpty()
    @Min(1)
    @Max(10)
    @ApiProperty({
        description: 'The rating of the teacher by their students.',
        minimum: 1,
        maximum: 10
    })
    rating: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The ID of the assignment(s) made by the teacher.',
        minimum: 0
    })
    assignmentId: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The password of the teacher, contained in a hashed format.'
    })
    password: string;
}
