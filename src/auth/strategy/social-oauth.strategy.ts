import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';

@Injectable()
export class SocialOAuthStrategy extends PassportStrategy(
  GoogleStrategy,
  'google',
) {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: (error: any, user?: any, info?: any) => void,
  ): Promise<any> {
    try {
      const user = await this.authService.validateOAuth2User(profile);

      if (!user) {
        throw new UnauthorizedException(
          'User not found or could not be created',
        );
      }

      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  }
}
