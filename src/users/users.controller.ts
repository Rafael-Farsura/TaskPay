import {
  Controller,
  Get,
  Post,
  Body,
  ParseUUIDPipe,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthTokenGuard } from 'src/auth/guards/auth-token.guard';

@UseGuards(AuthTokenGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('find')
  findAll() {
    return this.usersService.findAll();
  }

  @Get('find/id')
  findOneById(@Body('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOneByEmailOrId(id);
  }

  @Get('find/email')
  findOneByEmail(@Body('email') email: string) {
    return this.usersService.findOneByEmailOrId(email);
  }

  @Patch('update')
  update(
    @Query('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }
}
