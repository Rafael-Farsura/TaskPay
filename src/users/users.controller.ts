import {
  Controller,
  Get,
  Post,
  Body,
  ParseUUIDPipe,
  Patch,
  UseGuards,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthTokenGuard } from 'src/auth/guards/auth-token.guard';
import { TokenPayloadParam } from 'src/auth/params/token-payload.params';
import { TokenPayloadDto } from 'src/auth/dto/token-payload.dto';

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

  @Get('find/id/:id')
  findOneById(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOneByEmailOrId(id);
  }

  @Get('find/email/:email')
  findOneByEmail(@Param('email') email: string) {
    return this.usersService.findOneByEmailOrId(email);
  }

  @Patch('update/:id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
    @TokenPayloadParam() tokenPayloadDto: TokenPayloadDto,
  ) {
    return this.usersService.update(id, updateUserDto, tokenPayloadDto);
  }

  @Delete('delete/:id')
  delete(
    @Param('id', ParseUUIDPipe) id: string,
    @TokenPayloadParam() tokenPayloadDto: TokenPayloadDto,
  ) {
    return this.usersService.remove(id, tokenPayloadDto);
  }
}
