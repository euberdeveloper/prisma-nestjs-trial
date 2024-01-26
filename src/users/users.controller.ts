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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @ApiOkResponse({ type: [UserEntity] })
    async findAll() {
        const users = await this.usersService.findAll();
        return users.map((user) => new UserEntity(user));
    }

    @Get(':id')
    @ApiOkResponse({ type: UserEntity })
    async findById(@Param('id') id: number) {
        return new UserEntity(await this.usersService.findById(id));
    }

    @Get('/email/:email')
    @ApiOkResponse({ type: UserEntity })
    async findByEmail(@Param('email') email: string) {
        return new UserEntity(await this.usersService.findByEmail(email));
    }

    @Post()
    @ApiCreatedResponse({ type: UserEntity })
    async create(@Body() createUserDto: CreateUserDto) {
        return new UserEntity(await this.usersService.create(createUserDto));
    }

    @Patch(':id')
    @ApiOkResponse({ type: UserEntity })
    async update(
        @Param('id') id: number,
        @Body() updateUserDto: UpdateUserDto
    ) {
        return new UserEntity(
            await this.usersService.update(id, updateUserDto)
        );
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id') id: number) {
        return this.usersService.remove(id);
    }
}
