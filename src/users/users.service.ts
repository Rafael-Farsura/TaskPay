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

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const { email, password, name } = createUserDto;

    if (await this.userRepository.findOne({ where: { email } }))
      throw new ConflictException(
        `User: ${name}, email: ${email} already exists`,
      );

    const hashedPassword = await bcrypt.hash(password, 10);

    const user: User = this.userRepository.create({
      email,
      password: hashedPassword,
      name,
    });

    try {
      const savedUser = await this.userRepository.save(user);
      const { password: _, ...result } = savedUser;
      return result;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Email already registered.');
      } else {
        console.error('Erro ao salvar usuário:', error);

        throw new BadRequestException(
          'Error creating user.\nDetails:' + error.message,
        );
      }

      /// TODO need implement and JWT
    }
  }

  async findAll(): Promise<Omit<User, 'password'>[]> {
    const users = await this.userRepository.find();

    return users.map((user) => {
      const { password: _, ...result } = user;
      return result;
    });
  }

  async findOneById(id: string): Promise<Omit<User, 'password'> | null> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) return null;

    const { password: _, ...result } = user;

    return result;
  }

  async findOneByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'name', 'password', 'createdAt', 'updatedAt'],
    });

    if (user) return user;

    throw new NotFoundException(`User: ${email} not found`);
  }

  /// TODO these will be implemented later
  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }
  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
