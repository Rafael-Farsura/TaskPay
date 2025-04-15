import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Inject } from '@nestjs/common';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigType } from '@nestjs/config';
import googleOauthConfig from 'src/shared/config/google-auth/google-oauth.config';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @Inject(googleOauthConfig.KEY)
    private googleConfiguration: ConfigType<typeof googleOauthConfig>,
    private readonly authService: AuthService,
  ) {
    const { clientID, clientSecret, callBackUrl } = googleConfiguration;

    if (!clientID || !clientSecret || !callBackUrl) {
      throw new Error('Google OAuth configuration is missing required fields.');
    }

    super({
      clientID,
      clientSecret,
      callbackURL: callBackUrl,
      scope: ['email', 'profile', 'openid'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    console.log('Access Token:', accessToken);
    console.log('Refresh Token:', refreshToken);
    console.log('Profile received from Google:', { profile });

    if (!profile) {
      return done(new Error('Invalid profile data from Google'), false);
    }

    try {
      const user = await this.authService.validateUser(profile);
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  }
}
