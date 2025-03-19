import { $Enums, Teacher } from "@prisma/client";
import { isNotEmpty, IsNotEmpty, IsString } from "class-validator";

export class CreateAssignmentDto {

    @IsNotEmpty()
    subject: $Enums.Subjects;

    @IsNotEmpty()
    ageGroup: $Enums.Level;

    @IsNotEmpty()
    teacherId: number
    @IsNotEmpty()
    name: string
    description: string
}
