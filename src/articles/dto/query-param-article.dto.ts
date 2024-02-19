import { ApiProperty } from '@nestjs/swagger';
import { Equals, IsOptional } from 'class-validator';

export class QueryParamArticleDto {
    @IsOptional()
    @Equals('author')
    @ApiProperty({ required: false, enum: ['author'] })
    embed: 'author';
}
