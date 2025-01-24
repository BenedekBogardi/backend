import { IsEmail, IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

export class CreateTeacherDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    subjectTeacher: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    hourlyRate: number;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Min(0)
    @Max(0)
    numberOfStudents: number;

    @IsNotEmpty()
    @Min(0)
    @Max(10)
    rating: number;

    @IsNumber()
    @IsNotEmpty()
    assignmentId: number;

    @IsString()
    @IsNotEmpty()
    password: string;
}
