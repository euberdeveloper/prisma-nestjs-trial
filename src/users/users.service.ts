import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}

    findAll() {
        return this.prisma.user.findMany();
    }

    findById(id: number) {
        return this.prisma.user.findUniqueOrThrow({ where: { id } });
    }

    findByEmail(email: string) {
        return this.prisma.user.findUniqueOrThrow({ where: { email } });
    }

    create({ role, ...user }: CreateUserDto) {
        return this.prisma.user.create({
            data: {
                ...user,
                role: { connect: { name: role } }
            }
        });
    }

    update(id: number, { role, ...user }: UpdateUserDto) {
        return this.prisma.user.update({
            where: { id },
            data: {
                ...user,
                role: { connect: { name: role } }
            }
        });
    }

    remove(id: number) {
        return this.prisma.user.delete({ where: { id } });
    }
}
