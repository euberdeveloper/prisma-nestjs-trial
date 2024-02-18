import {
    createParamDecorator,
    ExecutionContext,
    InternalServerErrorException
} from '@nestjs/common';
import { Request } from 'express';

import { UserEntity } from 'src/users/entities/user.entity';

export const User = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest() as Request;
        const user = request.user as UserEntity | null;

        if (!user) {
            throw new InternalServerErrorException('User not found in request');
        }

        return new UserEntity(user);
    }
);
