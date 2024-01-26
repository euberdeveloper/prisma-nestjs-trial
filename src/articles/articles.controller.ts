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
    Put
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

@Controller('articles')
@ApiTags('articles')
export class ArticlesController {
    constructor(private readonly articlesService: ArticlesService) {}

    @Get()
    @ApiOperation({ summary: 'Get all published articles' })
    @ApiOkResponse({ type: [ArticleEntity] })
    async findPublished(): Promise<ArticleEntity[]> {
        const articles = await this.articlesService.findPublished();
        return articles.map((article) => new ArticleEntity(article));
    }

    @Get('drafts')
    @ApiOperation({ summary: 'Get all non-published articles' })
    @ApiOkResponse({ type: [ArticleEntity] })
    async findDrafts() {
        const articles = await this.articlesService.findDrafts();
        return articles.map((article) => new ArticleEntity(article));
    }

    @Get(':id')
    @ApiOkResponse({ type: ArticleEntity })
    async findOne(@Param('id') id: number): Promise<ArticleEntity> {
        return new ArticleEntity(await this.articlesService.findOne(id));
    }

    @Post()
    @ApiCreatedResponse({ type: ArticleEntity })
    async create(
        @Body() createArticleDto: CreateArticleDto
    ): Promise<ArticleEntity> {
        return new ArticleEntity(
            await this.articlesService.create(createArticleDto)
        );
    }

    @Put(':id')
    @ApiOkResponse({ type: ArticleEntity })
    async replace(
        @Param('id') id: number,
        @Body() replaceArticleDto: ReplaceArticleDto
    ): Promise<ArticleEntity> {
        return new ArticleEntity(
            await this.articlesService.replace(id, replaceArticleDto)
        );
    }

    @Patch(':id')
    @ApiOkResponse({ type: ArticleEntity })
    async update(
        @Param('id') id: number,
        @Body() updateArticleDto: UpdateArticleDto
    ): Promise<ArticleEntity> {
        return new ArticleEntity(
            await this.articlesService.update(id, updateArticleDto)
        );
    }

    @Delete(':id')
    @ApiNoContentResponse()
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id') id: number): Promise<void> {
        await this.articlesService.remove(id);
    }
}
