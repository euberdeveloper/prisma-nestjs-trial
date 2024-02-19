import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserEntity } from 'src/users/entities/user.entity';
import { JwtBody, JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService
    ) {}

    async validateUserLocal(
        email: string,
        password: string
    ): Promise<UserEntity> {
        const user = await this.prisma.user.findUnique({
            where: { email, password },
            include: { role: true }
        });

        if (!user) {
            throw new UnauthorizedException('Invalid email or password');
        }

        return new UserEntity(user);
    }

    async validateUserJwt(payload: JwtBody): Promise<UserEntity> {
        const id = +payload.sub;
        const email = payload.email;
        const user = await this.prisma.user.findUnique({
            where: { id, email },
            include: { role: true }
        });

        if (!user) {
            throw new UnauthorizedException();
        }

        return new UserEntity(user);
    }

    async login(user: UserEntity) {
        return {
            user,
            token: this.jwtService.sign({ email: user.email } as JwtPayload, {
                subject: user.id.toString()
            })
        };
    }

    async me(user: UserEntity) {
        return user;
    }
}
