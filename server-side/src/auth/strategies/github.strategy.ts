import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-github';
import { VerifiedCallback } from 'passport-jwt';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(private configService: ConfigService) {
    super({
      clientID: configService.get('GITHUB_CLIENT_ID'),
      clientSecret: configService.get('GITHUB_CLIENT_SECRET'),
      callbackURL: configService.get('SERVER_URL') + '/auth/github/callback',
      scope: ['user:email', 'read:user'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: VerifiedCallback,
  ) {
    const { displayName, username, emails, photos } = profile;

    const user = {
      githubId: profile.id,
      name: username,
      email: emails[0].value,
      picture: photos[0].value,
    };

    done(null, user);
  }
}
