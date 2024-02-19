import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { PrismaModule } from './prisma/prisma.module';
import { ArticlesModule } from './articles/articles.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { JwtAuthGuard } from './auth/guards/jwt.guard';
import { AuthorizationGuard } from './auth/guards/authorization.guard';

@Module({
    imports: [
        PrismaModule,
        ArticlesModule,
        UsersModule,
        AuthModule,
        RolesModule
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard
        },
        {
            provide: APP_GUARD,
            useClass: AuthorizationGuard
        }
    ]
})
export class AppModule {}
