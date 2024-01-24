import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    NotFoundException,
    HttpCode,
    HttpStatus,
    Put
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

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
    @ApiOkResponse({ type: [ArticleEntity] })
    findAll(): Promise<ArticleEntity[]> {
        return this.articlesService.findAll();
    }

    @Get('drafts')
    @ApiOkResponse({ type: [ArticleEntity] })
    findDrafts() {
        return this.articlesService.findDrafts();
    }

    @Get(':id')
    @ApiOkResponse({ type: ArticleEntity })
    async findOne(@Param('id') id: string): Promise<ArticleEntity> {
        const article = await this.articlesService.findOne(+id);
        if (!article) {
            throw new NotFoundException(`Article #${id} not found`);
        }
        return article;
    }

    @Post()
    @ApiCreatedResponse({ type: ArticleEntity })
    create(@Body() createArticleDto: CreateArticleDto): Promise<ArticleEntity> {
        return this.articlesService.create(createArticleDto);
    }

    @Put(':id')
    @ApiOkResponse({ type: ArticleEntity })
    replace(
        @Param('id') id: string,
        @Body() replaceArticleDto: ReplaceArticleDto
    ): Promise<ArticleEntity> {
        return this.articlesService.replace(+id, replaceArticleDto);
    }

    @Patch(':id')
    @ApiOkResponse({ type: ArticleEntity })
    update(
        @Param('id') id: string,
        @Body() updateArticleDto: UpdateArticleDto
    ): Promise<ArticleEntity> {
        return this.articlesService.update(+id, updateArticleDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id') id: string): Promise<void> {
        await this.articlesService.remove(+id);
    }
}
