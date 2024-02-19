import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { UserEntity } from 'src/users/entities/user.entity';

export const Role = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest() as Request;
        return (request.user as UserEntity | undefined)?.role;
    }
);
