import { $Enums, Assignment } from "@prisma/client"

export class TeacherProfileDto {
    firstName: string
    lastName: string
    email: string
    subject: $Enums.Subjects
    role: $Enums.Role
}