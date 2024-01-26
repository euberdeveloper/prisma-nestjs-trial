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

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @ApiOkResponse({ type: [CreateUserDto] })
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    @ApiOkResponse({ type: CreateUserDto })
    findById(@Param('id') id: number) {
        return this.usersService.findById(id);
    }

    @Get('/email/:email')
    @ApiOkResponse({ type: CreateUserDto })
    findByEmail(@Param('email') email: string) {
        return this.usersService.findByEmail(email);
    }

    @Post()
    @ApiCreatedResponse({ type: CreateUserDto })
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Patch(':id')
    @ApiOkResponse({ type: CreateUserDto })
    update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id') id: number) {
        return this.usersService.remove(id);
    }
}
