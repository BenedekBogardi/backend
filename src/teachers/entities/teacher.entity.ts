import { ApiProperty } from "@nestjs/swagger";

export class Teacher {
    id: number;

    @ApiProperty({
        description: 'Full name of teacher'
    })
    name: string;

    @ApiProperty({
        description: 'The subject being taught by the teacher.'
    })
    subjectTeacher: string;

    @ApiProperty({
        description: 'Hourly rate/pricing of the teacher in HUF currency.',
        minimum: 0
    })
    hourlyRate: number;

    @ApiProperty({
        description: 'E-mail address of the teacher.'
    })
    email: string

    @ApiProperty({
        description: 'The number of students that the teacher has.',
        minimum: 0,
        maximum: 30
    })
    numberOfStudents: number;

    @ApiProperty({
        description: 'The rating of the teacher by their students.',
        minimum: 1,
        maximum: 10
    })
    rating: number;
}
