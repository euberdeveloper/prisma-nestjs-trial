import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

import { RoleName } from 'src/roles/entities/role.entity';

import constants from 'src/common/constants';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<
            RoleName[] | undefined
        >(constants.decorators.roles, [
            context.getHandler(),
            context.getClass()
        ]);

        if (!requiredRoles) {
            return true;
        }

        const request = context.switchToHttp().getRequest() as Request;
        const user = request.user as UserEntity;
        return requiredRoles.some((role) => user.role.name === role);
    }
}
