import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'The mail can not be empty' })
  @IsEmail({}, { message: 'Invalid Email format' })
  @MaxLength(100)
  email: string;

  @IsNotEmpty({ message: 'The password can not be empty' })
  @IsString()
  @MinLength(8, { message: 'The password need at least 8 characters long' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'The name can not be empty' })
  @MaxLength(100)
  name: string;
}
