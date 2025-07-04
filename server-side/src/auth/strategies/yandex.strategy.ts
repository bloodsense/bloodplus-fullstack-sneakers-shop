import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-yandex';

@Injectable()
export class YandexStrategy extends PassportStrategy(Strategy, 'yandex') {
  constructor(private configService: ConfigService) {
    const clientID = configService.get<string>('YANDEX_CLIENT_ID');
    const clientSecret = configService.get<string>('YANDEX_CLIENT_SECRET');
    const serverUrl = configService.get<string>('SERVER_URL');

    if (!clientID || !clientSecret || !serverUrl) {
      throw new Error(
        'Значения YANDEX_CLIENT_ID, YANDEX_CLIENT_SECRET или SERVER_URL в переменном окружении (.env) не найдены',
      );
    }

    super({
      clientID: clientID,
      clientSecret: clientSecret,
      callbackURL: serverUrl + '/auth/yandex/callback',
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: any,
  ): Promise<any> {
    const { userName, emails, photos } = profile;

    const email = emails && emails.length > 0 ? emails[0].value : null;
    const picture = photos && photos.length > 0 ? photos[0].value : null;

    const user = {
      email: email,
      name: userName,
      picture: picture,
    };

    done(null, user);
  }
}
