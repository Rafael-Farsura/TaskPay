import {
  IsEthereumAddress,
  IsNotEmpty,
  IsString,
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class WalletLoginDto {
  @ApiProperty({ description: 'User address' })
  @IsEthereumAddress()
  @IsNotEmpty()
  walletAddress: string;

  @ApiProperty({ description: 'User  signature' })
  @IsString()
  @IsNotEmpty()
  signature: string;
}
