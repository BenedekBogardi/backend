import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateStudentDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    ageGroup: string;

    @IsNotEmpty()
    @IsString()
    subjectStudent: string;

    @IsNumber()
    @IsNotEmpty()
    assignmentId: number;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;
    
}
