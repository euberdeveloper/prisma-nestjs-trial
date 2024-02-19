import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';

import { RoleEntity } from 'src/roles/entities/role.entity';

export class RawUserEntity implements User {
    @ApiProperty()
    id: number;

    @ApiProperty()
    fullname: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty()
    roleId: number;

    @ApiProperty({ type: RoleEntity })
    role: RoleEntity;

    @Exclude()
    password: string;

    constructor({ role, ...data }: Partial<RawUserEntity>) {
        Object.assign(this, data);

        if (role) {
            this.role = new RoleEntity(role);
        }
    }
}
