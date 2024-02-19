import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthEntity } from './entities/auth.entity';
import { LocalAuthGuard } from './guards/local.guard';

import { User } from 'src/decorators/user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { Public } from './decorators/public.decorator';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @Public()
    @UseGuards(LocalAuthGuard)
    @ApiOkResponse({ type: AuthEntity })
    login(@User() user: UserEntity, @Body() _loginDto: LoginDto) {
        return this.authService.login(user);
    }
}
