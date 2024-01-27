import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsString,
    IsStrongPassword,
    MaxLength
} from 'class-validator';
import { RoleName } from 'src/roles/entities/role.entity';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    fullname: string;

    @IsEmail()
    @ApiProperty()
    email: string;

    @IsStrongPassword({
        minLength: 8
    })
    @MaxLength(24)
    @ApiProperty()
    password: string;

    @IsEnum(RoleName)
    @ApiProperty({ enum: RoleName })
    role: RoleName;
}
