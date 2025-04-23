import {
  BadRequestException,
  ConflictException,
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

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
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

    if (!user) throw new NotFoundException('User not found!');

    return await this.userRepository.save(user);
  }

  /// TODO these will be implemented later
  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
