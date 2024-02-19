import {
    ForbiddenException,
    Injectable,
    NotFoundException,
    UnauthorizedException
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { RoleName } from 'src/roles/entities/role.entity';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}

    findAll() {
        return this.prisma.user.findMany({ include: { role: true } });
    }

    findById(id: number) {
        return this.prisma.user.findUniqueOrThrow({
            where: { id },
            include: { role: true }
        });
    }

    findByEmail(email: string) {
        return this.prisma.user.findUniqueOrThrow({
            where: { email },
            include: { role: true }
        });
    }

    create(myRole: RoleName, { role, ...user }: CreateUserDto) {
        switch (role) {
            case RoleName.ROOT:
                throw new ForbiddenException();
            case RoleName.ADMIN:
                if (myRole !== RoleName.ROOT) {
                    throw new UnauthorizedException();
                }
        }

        return this.prisma.user.create({
            data: {
                ...user,
                role: { connect: { name: role } }
            },
            include: { role: true }
        });
    }

    update(
        id: number,
        myRole: RoleName,
        isMe: boolean,
        { role, ...user }: UpdateUserDto
    ) {
        if (!isMe && myRole !== RoleName.ROOT) {
            throw new UnauthorizedException();
        }

        return this.prisma.user.update({
            where: { id },
            data: {
                ...user,
                role: { connect: role ? { name: role } : undefined }
            },
            include: { role: true }
        });
    }

    remove(id: number, isMe: boolean, myRole: RoleName) {
        const user = this.prisma.user.findUnique({
            where: { id },
            include: { role: { select: { name: true } } }
        });

        if (!user) {
            throw new NotFoundException();
        }

        switch (user.role.name) {
            case RoleName.ROOT:
                throw new ForbiddenException();
            case RoleName.ADMIN:
                if (!isMe || myRole !== RoleName.ROOT) {
                    throw new UnauthorizedException();
                }
            case RoleName.USER:
                if (
                    !isMe ||
                    ![RoleName.ROOT, RoleName.ADMIN].includes(myRole)
                ) {
                    throw new UnauthorizedException();
                }
        }

        return this.prisma.user.delete({ where: { id } });
    }
}
