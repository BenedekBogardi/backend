import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'E-mail address of the teacher.',
    example: "john.doe@example.com"
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The password of the teacher, contained in a hashed format.'
  })
  password: string;
}
