import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const IsMe = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest() as Request & {
            isMe: boolean | undefined;
        };

        return request.isMe;
    }
);
