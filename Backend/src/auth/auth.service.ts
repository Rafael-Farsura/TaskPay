import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';

import { HashingServiceProtocol } from './hashing/hashing.service';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';
import { getJwtConfig } from 'src/config/jwt.config';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly hashingService: HashingServiceProtocol,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async validateUser(loginDto: LoginDto): Promise<User | null> {
    const { password, email } = loginDto;

    const user: User | null = await this.usersService.findOneByEmailOrId(email);

    if (user && password) {
      const isPasswordValid = await this.hashingService.compare(
        password,
        user.password,
      );

      return isPasswordValid ? user : null;
    }

    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto);

    if (!user) throw new UnauthorizedException('Invalid user credentials');

    const jwtOptions = getJwtConfig(this.configService);

    const payload = {
      sub: user.id,
      email: user.email,
    };

    return {
      access_token: await this.jwtService.signAsync(
        payload,
        jwtOptions.signOptions,
      ),
    };
  }
}
