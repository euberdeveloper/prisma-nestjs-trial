import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ReplaceRoleDto } from './dto/replace-role.dto';

@Injectable()
export class RolesService {
    constructor(private readonly prisma: PrismaService) {}

    findAll() {
        return this.prisma.role.findMany();
    }

    findById(id: number) {
        return this.prisma.role.findUniqueOrThrow({ where: { id } });
    }

    findByName(name: string) {
        return this.prisma.role.findUniqueOrThrow({ where: { name } });
    }

    create(createRoleDto: CreateRoleDto) {
        return this.prisma.role.create({ data: createRoleDto });
    }

    replace(id: number, replaceRoleDto: ReplaceRoleDto) {
        return this.prisma.role.update({
            where: { id },
            data: replaceRoleDto
        });
    }

    update(id: number, updateRoleDto: UpdateRoleDto) {
        return this.prisma.role.update({
            where: { id },
            data: updateRoleDto
        });
    }

    remove(id: number) {
        return this.prisma.role.delete({ where: { id } });
    }
}
