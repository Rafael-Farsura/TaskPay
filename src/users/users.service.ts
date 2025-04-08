import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private authService: AuthService,
  ) {}

  findAll() {
    return this.userRepository.find();
  }

  async findOne(
    params: Partial<Pick<User, 'id' | 'email' | 'walletAddress'>>,
  ): Promise<User | null> {
    return this.authService.findUser(params);
  }

  async remove(id: number) {
    await this.userRepository.delete(id);
    return { message: `User #${id} removed` };
  }
}
