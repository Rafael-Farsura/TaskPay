import { LoginUserDto } from './dto/login-user.dto';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from './dto/user-response.dto';
import { WalletLoginDto } from './dto/wallet-login.dto';
import { verifyMessage } from 'ethers';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  private generateToken(user: User) {
    return {
      access_token: this.jwtService.sign({ sub: user.id, email: user.email }),
    };
  }

  async register(
    createUserDto: CreateUserDto,
  ): Promise<{ user: UserResponseDto; access_token: string }> {
    const existingEmail: User | null = await this.findUser({
      email: createUserDto.email,
    });

    if (existingEmail)
      throw new ConflictException(
        `This User: ${createUserDto.email} already exists`,
      );

    const existingWallet = await this.findUser({
      walletAddress: createUserDto.walletAddress,
    });

    if (existingWallet)
      throw new ConflictException('Wallet already registered');

    const user = this.userRepository.create(createUserDto);
    user.password = await bcrypt.hash(createUserDto.password, 10);

    await this.userRepository.save(user);

    return {
      user: plainToInstance(UserResponseDto, user, {
        excludeExtraneousValues: true,
      }),
      ...this.generateToken(user),
    };
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.findUser({ email: loginUserDto.email });

    if (!user) throw new UnauthorizedException('Invalid credentials');

    return {
      user: plainToInstance(UserResponseDto, user, {
        excludeExtraneousValues: true,
      }),
      ...this.generateToken(user),
    };
  }

  async walletLogin(walletLoginDto: WalletLoginDto) {
    const msg = `Login request for ${walletLoginDto.walletAddress}`;
    const recoveredAddress = verifyMessage(msg, walletLoginDto.signature);

    if (
      recoveredAddress.toLowerCase() !==
      walletLoginDto.walletAddress.toLowerCase()
    )
      throw new UnauthorizedException('Invalid signature');

    let user = await this.findUser({
      walletAddress: walletLoginDto.walletAddress,
    });

    if (!user) {
      user = this.userRepository.create({
        walletAddress: walletLoginDto.walletAddress,
      });

      await this.userRepository.save(user);
    }

    return {
      user: plainToInstance(UserResponseDto, user, {
        excludeExtraneousValues: true,
      }),

      ...this.generateToken(user),
    };
  }

  public async findUser(
    params: Partial<Pick<User, 'id' | 'email' | 'walletAddress'>>,
  ): Promise<User | null> {
    const filter = Object.entries(params).find(
      ([, value]) => value !== undefined,
    );

    if (!filter) throw new BadRequestException('No valid user filter provided');

    const [key, value] = filter as [keyof User, string];

    return this.userRepository.findOneBy({ [key]: value } as Record<
      string,
      any
    >);
  }
}
