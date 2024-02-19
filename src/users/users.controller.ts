import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpStatus,
    HttpCode
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags
} from '@nestjs/swagger';

import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleName } from 'src/roles/entities/role.entity';
import { Me } from 'src/auth/decorators/me.decorator';
import { IsMe } from 'src/decorators/is-me.decorator';
import { Role } from 'src/decorators/role';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Returns all the users' })
    @ApiOkResponse({ type: [UserEntity] })
    async findAll() {
        const users = await this.usersService.findAll();
        return users.map((user) => new UserEntity(user));
    }

    @Get(':id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Returns the user with specified id' })
    @ApiOkResponse({ type: UserEntity })
    async findById(@Param('id') id: number) {
        return new UserEntity(await this.usersService.findById(id));
    }

    @Get('/email/:email')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Returns the user with specified email' })
    @ApiOkResponse({ type: UserEntity })
    async findByEmail(@Param('email') email: string) {
        return new UserEntity(await this.usersService.findByEmail(email));
    }

    @Post()
    @Roles(RoleName.ROOT, RoleName.ADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new user' })
    @ApiCreatedResponse({ type: UserEntity })
    async create(@Role() role: RoleName, @Body() createUserDto: CreateUserDto) {
        return new UserEntity(
            await this.usersService.create(role, createUserDto)
        );
    }

    @Patch(':id')
    @Roles(RoleName.ROOT)
    @Me('either')
    @ApiBearerAuth()
    @ApiOperation({ summary: "Updates the user's data" })
    @ApiOkResponse({ type: UserEntity })
    async update(
        @Role() role: RoleName,
        @IsMe() isMe: boolean,
        @Param('id') id: number,
        @Body() updateUserDto: UpdateUserDto
    ) {
        return new UserEntity(
            await this.usersService.update(id, role, isMe, updateUserDto)
        );
    }

    @Delete(':id')
    @Roles(RoleName.ROOT, RoleName.ADMIN)
    @Me()
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Removes the user with specified id' })
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(
        @Role() role: RoleName,
        @IsMe() isMe: boolean,
        @Param('id') id: number
    ) {
        return this.usersService.remove(id, isMe, role);
    }
}
