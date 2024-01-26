import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpStatus,
    HttpCode,
    UseGuards
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiTags
} from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({ type: [UserEntity] })
    async findAll() {
        const users = await this.usersService.findAll();
        return users.map((user) => new UserEntity(user));
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ type: UserEntity })
    async findById(@Param('id') id: number) {
        return new UserEntity(await this.usersService.findById(id));
    }

    @Get('/email/:email')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
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
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
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
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id') id: number) {
        return this.usersService.remove(id);
    }
}
