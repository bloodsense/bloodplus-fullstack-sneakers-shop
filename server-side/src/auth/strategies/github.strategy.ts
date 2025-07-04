import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-github';
import { DoneCallback } from 'passport';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(private configService: ConfigService) {
    const clientID = configService.get<string>('GITHUB_CLIENT_ID');
    const clientSecret = configService.get<string>('GITHUB_CLIENT_SECRET');
    const serverUrl = configService.get<string>('SERVER_URL');

    if (!clientID || !clientSecret || !serverUrl) {
      throw new Error(
        'Значения GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET или SERVER_URL в переменном окружении (.env) не найдены',
      );
    }

    super({
      clientID: clientID,
      clientSecret: clientSecret,
      callbackURL: serverUrl + '/auth/github/callback',
      scope: ['user:email', 'read:user'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: DoneCallback,
  ) {
    const { username, emails, photos } = profile;

    const user = {
      githubId: profile.id,
      name: username,
      email:
        emails && emails.length > 0 && emails[0].value ? emails[0].value : null,
      picture:
        photos && photos.length > 0 && photos[0].value ? photos[0].value : null,
    };

    done(null, user);
  }
}
