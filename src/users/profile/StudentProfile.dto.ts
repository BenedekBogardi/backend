import { $Enums } from "@prisma/client";

export class StudentProfileDto {
    firstName: string;
    lastName: string;
    email: string;
    ageGroup: $Enums.Level
    role: $Enums.Role
}