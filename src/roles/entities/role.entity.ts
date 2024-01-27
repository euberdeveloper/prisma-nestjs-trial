import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export enum RoleName {
    ROOT = 'root',
    ADMIN = 'admin',
    USER = 'user'
}

export class RoleEntity implements Role {
    constructor(partial: Partial<RoleEntity>) {
        Object.assign(this, partial);
    }

    @ApiProperty()
    id: number;

    @ApiProperty({ enum: RoleName })
    name: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}
