import { ApiProperty } from '@nestjs/swagger';
import { Equals, IsOptional } from 'class-validator';

export class QueryParamArticleDto {
    @IsOptional()
    @Equals('author')
    @ApiProperty()
    embed: 'author';
}
