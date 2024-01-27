import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Put
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ReplaceRoleDto } from './dto/replace-role.dto';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
    constructor(private readonly rolesService: RolesService) {}

    @Get()
    findAll() {
        return this.rolesService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: number) {
        return this.rolesService.findById(id);
    }

    @Get('name/:name')
    findByName(@Param('name') name: string) {
        return this.rolesService.findByName(name);
    }

    @Post()
    create(@Body() createRoleDto: CreateRoleDto) {
        return this.rolesService.create(createRoleDto);
    }

    @Put(':id')
    replace(@Param('id') id: number, @Body() replaceRoleDto: ReplaceRoleDto) {
        return this.rolesService.replace(id, replaceRoleDto);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() updateRoleDto: UpdateRoleDto) {
        return this.rolesService.update(id, updateRoleDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.rolesService.remove(id);
    }
}
