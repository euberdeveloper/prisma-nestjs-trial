import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpCode,
    HttpStatus,
    Put,
    Query
} from '@nestjs/common';
import {
    ApiCreatedResponse,
    ApiNoContentResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags
} from '@nestjs/swagger';

import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ReplaceArticleDto } from './dto/replace-article.dto';
import { ArticleEntity } from './entities/article.entity';

import { ArticlesService } from './articles.service';
import { QueryParamArticleDto } from './dto/query-param-article.dto';
import { User } from 'src/decorators/user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { RoleName } from 'src/roles/entities/role.entity';
import { Me } from 'src/auth/decorators/me.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('articles')
@ApiTags('articles')
export class ArticlesController {
    constructor(private readonly articlesService: ArticlesService) {}

    @Get()
    @ApiOperation({ summary: 'Get all published articles' })
    @ApiOkResponse({ type: [ArticleEntity] })
    async findPublished(
        @Query() query: QueryParamArticleDto
    ): Promise<ArticleEntity[]> {
        const articles = await this.articlesService.findPublished(query);
        return articles.map((article) => new ArticleEntity(article));
    }

    @Get('drafts')
    @ApiOperation({ summary: 'Get all non-published articles' })
    @ApiOkResponse({ type: [ArticleEntity] })
    async findDrafts(@Query() query: QueryParamArticleDto) {
        const articles = await this.articlesService.findDrafts(query);
        return articles.map((article) => new ArticleEntity(article));
    }

    @Get(':id')
    @ApiOkResponse({ type: ArticleEntity })
    async findOne(
        @Param('id') id: number,
        @Query() query: QueryParamArticleDto
    ): Promise<ArticleEntity> {
        return new ArticleEntity(await this.articlesService.findOne(id, query));
    }

    @Post()
    @ApiCreatedResponse({ type: ArticleEntity })
    async create(
        @User() user: UserEntity,
        @Body() createArticleDto: CreateArticleDto,
        @Query() query: QueryParamArticleDto
    ): Promise<ArticleEntity> {
        return new ArticleEntity(
            await this.articlesService.create(user, createArticleDto, query)
        );
    }

    @Put(':id')
    @Roles(RoleName.ROOT, RoleName.ADMIN)
    @Me('either')
    @ApiOkResponse({ type: ArticleEntity })
    async replace(
        @Param('id') id: number,
        @Body() replaceArticleDto: ReplaceArticleDto,
        @Query() query: QueryParamArticleDto
    ): Promise<ArticleEntity> {
        return new ArticleEntity(
            await this.articlesService.replace(id, replaceArticleDto, query)
        );
    }

    @Patch(':id')
    @Roles(RoleName.ROOT, RoleName.ADMIN)
    @Me('either')
    @ApiOkResponse({ type: ArticleEntity })
    async update(
        @Param('id') id: number,
        @Body() updateArticleDto: UpdateArticleDto,
        @Query() query: QueryParamArticleDto
    ): Promise<ArticleEntity> {
        return new ArticleEntity(
            await this.articlesService.update(id, updateArticleDto, query)
        );
    }

    @Delete(':id')
    @Roles(RoleName.ROOT, RoleName.ADMIN)
    @Me('either')
    @ApiNoContentResponse()
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id') id: number): Promise<void> {
        await this.articlesService.remove(id);
    }
}
