import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import config from 'src/common/config';

import { AuthService } from '../auth.service';
import { JwtBody } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            issuer: config.security.jwt.issuer,
            secretOrKey: config.security.jwt.secret
        } as StrategyOptions);
    }

    async validate(payload: JwtBody) {
        return this.authService.validateUserJwt(payload);
    }
}
