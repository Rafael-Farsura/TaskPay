import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { getJwtConfig } from 'src/config/jwt.config';
import { REQUEST_TOKEN_PAYLOAD_KEY } from '../auth.constants';

@Injectable()
export class AuthTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    const jwtOptions = getJwtConfig(this.configService);

    if (!token) throw new UnauthorizedException('Invalid JWT Header Token');

    try {
      const payload: object = await this.jwtService.verifyAsync(
        token,
        jwtOptions,
      );

      request[REQUEST_TOKEN_PAYLOAD_KEY] = payload;
    } catch (err) {
      console.error('JWT verification failed ! \n Error: ', err);

      throw new UnauthorizedException('Failed to login');
    }
    return true;
  }

  extractTokenFromHeader(request: Request): string | undefined {
    const authHeader = request.headers?.authorization;

    if (!authHeader || typeof authHeader !== 'string') return undefined;

    const [type, token] = authHeader.split(' ');
    return type === 'Bearer' ? token : undefined;
  }
}
