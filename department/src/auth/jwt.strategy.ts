import * as dotenv from 'dotenv';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import * as path from 'path';

const dirPath = path.join(__dirname, `../../.env`);
dotenv.config({ debug: true, path: dirPath, encoding: 'utf-8' });

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    console.log('Validating user:',payload);
    const user = await this.authService.validateUser(
      payload.email,
      payload.sub,
    );
    return { userId: payload.sub, email: payload.email };
  }
}
