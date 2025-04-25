import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HashingServiceProtocol } from './hashing/hashing.service';
import { BCryptService } from './hashing/bcrypt.service';
import { getJwtConfig } from 'src/config/jwt.config';

@Global()
@Module({
  imports: [
    ConfigModule,
    UsersModule,

    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
  ],

  controllers: [AuthController],

  providers: [
    AuthService,

    {
      provide: HashingServiceProtocol,
      useClass: BCryptService,
    },
  ],

  exports: [ConfigModule, HashingServiceProtocol, JwtModule],
})
export class AuthModule {}
