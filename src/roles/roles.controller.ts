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
import {
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiNoContentResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags
} from '@nestjs/swagger';

import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ReplaceRoleDto } from './dto/replace-role.dto';
import { RoleEntity } from './entities/role.entity';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
    constructor(private readonly rolesService: RolesService) {}

    @Get()
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Returns the available roles' })
    @ApiOkResponse({ type: RoleEntity })
    findAll() {
        return this.rolesService.findAll();
    }

    @Get(':id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Returns the role with specified id' })
    @ApiOkResponse({ type: RoleEntity })
    findById(@Param('id') id: number) {
        return this.rolesService.findById(id);
    }

    @Get('name/:name')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Returns the role with specified name' })
    @ApiOkResponse({ type: RoleEntity })
    findByName(@Param('name') name: string) {
        return this.rolesService.findByName(name);
    }

    @Post()
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Creates a new role' })
    @ApiCreatedResponse({ type: RoleEntity })
    create(@Body() createRoleDto: CreateRoleDto) {
        return this.rolesService.create(createRoleDto);
    }

    @Put(':id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Replaces the role with specified id' })
    @ApiOkResponse({ type: RoleEntity })
    replace(@Param('id') id: number, @Body() replaceRoleDto: ReplaceRoleDto) {
        return this.rolesService.replaceById(id, replaceRoleDto);
    }

    @Put('name/:name')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Replaces the role with specified name' })
    @ApiOkResponse({ type: RoleEntity })
    replaceByName(
        @Param('name') name: string,
        @Body() replaceRoleDto: ReplaceRoleDto
    ) {
        return this.rolesService.replaceByName(name, replaceRoleDto);
    }

    @Patch(':id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Updates the role with specified id' })
    @ApiOkResponse({ type: RoleEntity })
    update(@Param('id') id: number, @Body() updateRoleDto: UpdateRoleDto) {
        return this.rolesService.updateById(id, updateRoleDto);
    }

    @Patch('name/:name')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Updates the role with specified name' })
    @ApiOkResponse({ type: RoleEntity })
    updateByName(
        @Param('name') name: string,
        @Body() updateRoleDto: UpdateRoleDto
    ) {
        return this.rolesService.updateByName(name, updateRoleDto);
    }

    @Delete(':id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Removes the role with specified id' })
    @ApiNoContentResponse()
    remove(@Param('id') id: number) {
        return this.rolesService.removeById(id);
    }

    @Delete('name/:name')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Removes the role with specified name' })
    @ApiNoContentResponse()
    removeByName(@Param('name') name: string) {
        return this.rolesService.removeByName(name);
    }
}
