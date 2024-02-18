import { SetMetadata } from '@nestjs/common';
import constants from 'src/common/constants';
import { RoleName } from 'src/roles/entities/role.entity';

export const Roles = (...roles: RoleName[]) =>
    SetMetadata(constants.decorators.roles, roles);
