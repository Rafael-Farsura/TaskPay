import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { HashingServiceProtocol } from './hashing/hashing.service';
import { BCryptService } from './hashing/bcrypt.service';
@Module({
  controllers: [AuthController],
  providers: [AuthService],
    {
      provide: HashingServiceProtocol,
      useClass: BCryptService,
    },
  exports: [AuthService, HashingServiceProtocol],
})
export class AuthModule {}
