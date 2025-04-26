import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export const getJwtConfig = (
  configService: ConfigService,
): JwtModuleOptions => ({
  secret: configService.get<string>('JWT_SECRET'),
  signOptions: {
    audience: configService.get<string>('JWT_TOKEN_AUDIENCE'),
    issuer: configService.get<string>('JWT_TOKEN_ISSUER'),
    expiresIn: parseInt(configService.get<string>('JWT_TTL') ?? '3600'),
  },
});
