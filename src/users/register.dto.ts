import { $Enums } from "@prisma/client";

export class RegisterDto {
    email: string;
    password: string
    firstName: string
    lastName: string
    role: $Enums.Role
}