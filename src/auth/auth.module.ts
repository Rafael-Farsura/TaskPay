import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { JwtStrategy } from './strategies/jwt.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { PassportModule } from '@nestjs/passport';
import googleOauthConfig from 'src/shared/config/google-auth/google-oauth.config';
import { getDatabaseConfig } from 'src/shared/config/database/database.config';
import { UsersService } from 'src/users/users.service';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),

    //!
    PassportModule.register({ defaultStrategy: 'google' }),
    //!

    //!
    ConfigModule.forFeature(googleOauthConfig),
    //!

    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '7d' },
      }),
      inject: [ConfigService],
    }),
  ],

  providers: [AuthService, JwtStrategy, GoogleStrategy, UsersService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
