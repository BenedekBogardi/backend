import { IsEmail, isNotEmpty, IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';


export class CreateTeacherDto {
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
        example: 'Történelem'
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
        example: "john.doe@example.com"
    })
    email: string;

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
