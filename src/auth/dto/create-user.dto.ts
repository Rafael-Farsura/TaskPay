import {
  IsEmail,
  IsEthereumAddress,
  IsNotEmpty,
  IsString,
  MinLength,
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'User address' })
  @IsEthereumAddress()
  walletAddress?: string;

  @ApiProperty({ description: 'User email' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'User password' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
