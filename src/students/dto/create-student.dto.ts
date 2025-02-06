import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateStudentDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: 'Full name of student.',
        example: 'John Doe'
    })
    name: string;
    

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: 'Age group of student, values can be "alsos", "felsos", "kozep_isk" or "felso_okt".',
        example: 'felsos'
    })
    ageGroup: string;
    

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: 'The subject selected by the student.',
        example: 'Matematika'
    })
    subjectStudent: string;
    

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The unique ID of an assignment given to the student.',
        example: '2143'
    })
    assignmentId: number;
    

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The login password of the student.',
        example: 'Mokus123'
    })
    password: string;
    
    @IsNotEmpty()
    @IsEmail() 
    @ApiProperty({
        description: 'The students email address.',
        example: 'johndoe@citromail.com'
    })
    email: string;
   
    
}
