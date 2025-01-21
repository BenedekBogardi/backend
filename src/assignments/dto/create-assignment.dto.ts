import { IsNotEmpty, IsString } from "class-validator";

export class CreateAssignmentDto {

    @IsNotEmpty()
    @IsString()
    subject: string;

    @IsNotEmpty()
    @IsString()
    ageGroup: string;

    @IsNotEmpty()
    @IsString()
    assignments: string;
}
