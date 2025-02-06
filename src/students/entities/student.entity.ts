import { ApiProperty } from "@nestjs/swagger";

export class Student {
    id: number;
    @ApiProperty({
        description: 'Full name of student'
    })
    name: string
    @ApiProperty({
        description: 'Age group of student, values can be "alsos", "felsos", "kozep_isk" or "felso_okt".'
    })
    ageGroup: string
    @ApiProperty({
        description: 'The subject selected by the student.'
    })
    subjectStudent: string
    }
