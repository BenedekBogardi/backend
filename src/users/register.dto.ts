import { IsEmail, IsNotEmpty, IsOptional, IsString, IsEnum, IsNumber } from 'class-validator';
import { $Enums } from '@prisma/client';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEnum($Enums.Role)
  role: $Enums.Role;

  // Optional fields
  @IsOptional()
  @IsEnum($Enums.Subjects)
  subject?: $Enums.Subjects;

  @IsOptional()
  @IsNumber()
  hourlyRate?: number;

  @IsOptional()
  @IsEnum($Enums.Level)
  ageGroup?: $Enums.Level;
}
