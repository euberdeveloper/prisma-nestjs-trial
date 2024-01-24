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
    HttpStatus
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ArticleEntity } from './entities/article.entity';

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
