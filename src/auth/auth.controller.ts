import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { WalletLoginDto } from './dto/wallet-login.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { GoogleAuthGuard } from 'src/guards/google-auth.guard';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<any> {
    return this.authService.register(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<any> {
    return this.authService.login(loginUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('wallet-login')
  async walletLogin(@Body() walletLoginDto: WalletLoginDto) {
    return this.authService.walletLogin(walletLoginDto);
  }

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  googleLogin(@Req() req: Request) {
    console.log(`Using google login, req: ${req.url}`);
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  googleCallback(@Req() req: Request, @Res() res: Response) {
    const user = req.user;
    console.log('User  authenticated:', user);

    res.redirect('/');
  }
}
