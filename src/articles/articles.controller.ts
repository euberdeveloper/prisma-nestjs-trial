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
    findPublished(): Promise<ArticleEntity[]> {
        return this.articlesService.findPublished();
    }

    @Get('drafts')
    @ApiOperation({ summary: 'Get all non-published articles' })
    @ApiOkResponse({ type: [ArticleEntity] })
    findDrafts() {
        return this.articlesService.findDrafts();
    }

    @Get(':id')
    @ApiOkResponse({ type: ArticleEntity })
    async findOne(@Param('id') id: number): Promise<ArticleEntity> {
        return this.articlesService.findOne(id);
    }

    @Post()
    @ApiCreatedResponse({ type: ArticleEntity })
    create(@Body() createArticleDto: CreateArticleDto): Promise<ArticleEntity> {
        return this.articlesService.create(createArticleDto);
    }

    @Put(':id')
    @ApiOkResponse({ type: ArticleEntity })
    replace(
        @Param('id') id: number,
        @Body() replaceArticleDto: ReplaceArticleDto
    ): Promise<ArticleEntity> {
        return this.articlesService.replace(id, replaceArticleDto);
    }

    @Patch(':id')
    @ApiOkResponse({ type: ArticleEntity })
    update(
        @Param('id') id: number,
        @Body() updateArticleDto: UpdateArticleDto
    ): Promise<ArticleEntity> {
        return this.articlesService.update(id, updateArticleDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id') id: number): Promise<void> {
        await this.articlesService.remove(id);
    }
}
