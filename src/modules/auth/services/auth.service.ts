import { OAuth2Client } from 'google-auth-library';
import { Injectable } from '@nestjs/common';
import { SessionService } from '@app/modules/auth/services/session.service';
import { UsersService } from '@app/modules/users/services/users.service';
import { User } from '@app/modules/users/entities/user.entity';

const client = new OAuth2Client();

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly sessionService: SessionService,
  ) {}

  async loginWithGoogle(token: string) {
    const googleUser = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = googleUser.getPayload();

    let user = await this.userService.findByOauthId(payload.sub);
    if (!user) {
      user = await this.userService.registerFromOAuthProvider({
        email: payload.email,
        name: payload.name,
        oauthId: payload.sub,
        providerId: 'google.com',
        avatar: payload.picture,
      });
    }
    return this.sessionService.createSession(User.createFromPrisma(user));
  }
}
