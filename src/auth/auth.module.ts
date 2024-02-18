import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';
import config from 'src/common/config';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

export const jwtSecret = 'zjP9h6ZI5LoSKCRj';

@Module({
    imports: [
        PrismaModule,
        PassportModule,
        JwtModule.register({
            secret: config.security.jwt.secret,
            signOptions: {
                issuer: config.security.jwt.issuer,
                expiresIn: config.security.jwt.expiresIn
            }
        }),
        UsersModule
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, LocalStrategy]
})
export class AuthModule {}
