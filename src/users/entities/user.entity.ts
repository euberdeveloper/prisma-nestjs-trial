import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';

import { RoleName } from 'src/roles/entities/role.entity';
import { RawUserEntity } from './raw-user.entity';

export class UserEntity implements User {
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

    @ApiProperty({ enum: RoleName })
    role: string;

    @Exclude()
    password: string;

    constructor({
        id,
        fullname,
        email,
        createdAt,
        updatedAt,
        role
    }: Partial<RawUserEntity | UserEntity>) {
        Object.assign(this, {
            id,
            fullname,
            email,
            createdAt,
            updatedAt
        });

        if (role) {
            this.role = typeof role === 'string' ? role : role.name;
        }
    }
}
