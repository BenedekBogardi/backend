import { $Enums } from "@prisma/client";

export class RegisterDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: $Enums.Role
}