import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';

import { HashingServiceProtocol } from './hashing/hashing.service';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';
import { getJwtConfig, getJwtRefreshTtl } from 'src/config/jwt.config';
import { RefreshTokenDto } from './dto/refresh-token.dto';

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

    return await this.createTokens(user);
  }

  private async createTokens(user: User) {
    const jwtTtl = Number(this.configService.get<number>('JWT_TTL'));
    const refreshTtl = getJwtRefreshTtl(this.configService);

    const access_tokenPromise = await this.signJwtAsync<Partial<User>>(
      user.id,
      jwtTtl,
      { email: user.email },
    );
    const refresh_tokenPromise = await this.signJwtAsync(user.id, refreshTtl);

    const [access_token, refresh_token] = await Promise.all([
      access_tokenPromise,
      refresh_tokenPromise,
    ]);

    return { access_token, refresh_token };
  }

  private async signJwtAsync<T>(sub: string, expiresIn: number, payload?: T) {
    const jwtOpts = getJwtConfig(this.configService);

    return await this.jwtService.signAsync(
      {
        sub,
        ...payload,
      },
      {
        expiresIn,
        ...jwtOpts.signOptions,
      },
    );
  }

  async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    const jwtOpts = getJwtConfig(this.configService);

    try {
      const { sub } = await this.jwtService.verifyAsync(
        refreshTokenDto.refreshToken,
        jwtOpts,
      );

      const user = await this.usersService.findOneByEmailOrId(sub as string);

      if (user) return await this.createTokens(user);
    } catch (err) {
      throw new UnauthorizedException(err.message);
    }
  }
}
