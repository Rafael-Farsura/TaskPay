import {
  Controller,
  Get,
  Param,
  Delete,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('findUser') //GET /users/findUser?id=...&email=...&walletAddress=...
  findOne(
    @Query('id') id?: string,
    @Query('email') email?: string,
    @Query('walletAddress') walletAddress?: string,
  ) {
    return this.usersService.findOne({ id, email, walletAddress });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    return this.usersService.findOne({ id: req.user.userId });
  }
}
