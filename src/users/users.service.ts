import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

import { isUUID } from 'class-validator';
import { HashingServiceProtocol } from 'src/auth/hashing/hashing.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { TokenPayloadDto } from '../auth/dto/token-payload.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly hashingService: HashingServiceProtocol,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email, password, name } = createUserDto;

    try {
      const passwordHash = await this.hashingService.hash(password);
      const newUser = this.userRepository.create({
        email,
        password: passwordHash,
        name,
      });

      return await this.userRepository.save(newUser);
    } catch (err) {
      if (err.code === '23585')
        throw new ConflictException(`User with email ${email} already exists.`);

      throw new BadRequestException(`Could not create user. error: ${err}`);
    }
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async findOneByEmailOrId(idOrMail: string): Promise<User | null> {
    if (!idOrMail) return null;

    const user = await this.userRepository.findOne({
      where: isUUID(idOrMail) ? { id: idOrMail } : { email: idOrMail },
    });

    if (!user) throw new NotFoundException(`User: ${idOrMail} not found`);

    return user;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    tokenPayloadDto: TokenPayloadDto,
  ) {
    const { name, email, password } = updateUserDto;
    const userData = {
      name,
      email,
      password,
    };

    if (password) {
      const passwordHash = await this.hashingService.hash(password);
      userData['password'] = passwordHash;
    }

    const user = await this.userRepository.preload({
      id,
      ...userData,
    });

    if (user?.id !== tokenPayloadDto.sub)
      throw new ForbiddenException('You could not edit other user infos.');

    return await this.userRepository.save(user);
  }

  async remove(id: string, tokenPayloadDto: TokenPayloadDto) {
    const user = await this.findOneByEmailOrId(id);

    if (user?.id !== tokenPayloadDto.sub)
      throw new ForbiddenException('You could not delete other user');

    await this.userRepository.remove(user);

    return {
      message: `User: ${user.name} was deleted successfully `,
    };
  }
}
