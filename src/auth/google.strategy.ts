import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from './auth.service';
import { IUser } from './dto/auth-user.dto';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(private readonly authService: AuthService) {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID || '', // Sua chave do cliente Google
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '', // Seu segredo do cliente Google
            callbackURL: 'http://localhost:3000/auth/google/callback', // URL de callback
            scope: ['email', 'profile'],
            passReqToCallback: false, // Passando 'false', porque não estamos usando o 'request'
        });
    }
  
  // O método `validate` é chamado após a autenticação com o Google
  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { id, name, emails, photos } = profile;

    const user: IUser = {
      googleId: id,
      email: emails[0].value,
      name: `${name.givenName} ${name.familyName}`,
      profilePicture: photos[0].value,
    };

    done(null, user);
  }
}