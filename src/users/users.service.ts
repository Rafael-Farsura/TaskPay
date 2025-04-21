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

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, name } = createUserDto;

    if (await this.userRepository.findOne({ where: { email } }))
      throw new ConflictException(
        `User: ${name}, email: ${email} already exists`,
      );

    const user: User = this.userRepository.create({ email, password, name });
    if (user) return await this.userRepository.save(user);

    throw new BadRequestException(
      `User: ${name}, email: ${email} could not be created`,
    );

    /// TODO need implement passwd encryption and JWT
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOneById(id: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ id });

    if (user) return user;

    throw new NotFoundException(`User: ${id} not found`);
  }

  async findOneByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ email });

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
