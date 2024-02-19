import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

import { RoleName } from 'src/roles/entities/role.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import constants from 'src/common/constants';

import { RolesCohesistance } from '../decorators/me.decorator';

@Injectable()
export class AuthorizationGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<
            RoleName[] | undefined
        >(constants.decorators.roles, [
            context.getHandler(),
            context.getClass()
        ]);
        const requiresMe = this.reflector.getAllAndOverride<
            | {
                  userIdParam: string;
                  rolesCohesistance: RolesCohesistance;
              }
            | undefined
        >(constants.decorators.me, [context.getHandler(), context.getClass()]);

        const request = context.switchToHttp().getRequest() as Request & {
            isMe?: boolean;
        };
        const user = request.user as UserEntity;
        const rolesCohesistance = requiresMe?.rolesCohesistance ?? 'roles';

        const rolesPasses =
            !requiredRoles || requiredRoles.some((role) => user.role === role);
        const mePasses =
            !requiresMe || user.id === +request.params[requiresMe.userIdParam];

        request.isMe = requiresMe ? mePasses : undefined;

        switch (rolesCohesistance) {
            case 'roles':
                return requiredRoles ? rolesPasses : mePasses;
            case 'me':
                return requiresMe ? mePasses : rolesPasses;
            case 'both':
                return rolesPasses && mePasses;
            case 'either':
                return rolesPasses || mePasses;
        }
    }
}
