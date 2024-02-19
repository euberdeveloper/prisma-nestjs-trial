import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ReplaceArticleDto } from './dto/replace-article.dto';
import { QueryParamArticleDto } from './dto/query-param-article.dto';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class ArticlesService {
    constructor(private prisma: PrismaService) {}

    private includeAuthor(query: QueryParamArticleDto) {
        return query.embed === 'author'
            ? { author: { include: { role: true } } }
            : { author: false };
    }

    findPublished(query: QueryParamArticleDto) {
        return this.prisma.article.findMany({
            where: { published: true },
            include: this.includeAuthor(query)
        });
    }

    findDrafts(query: QueryParamArticleDto) {
        return this.prisma.article.findMany({
            where: { published: false },
            include: this.includeAuthor(query)
        });
    }

    findOne(id: number, query: QueryParamArticleDto) {
        return this.prisma.article.findUniqueOrThrow({
            where: { id },
            include: this.includeAuthor(query)
        });
    }

    create(
        me: UserEntity,
        createArticleDto: CreateArticleDto,
        query: QueryParamArticleDto
    ) {
        return this.prisma.article.create({
            data: { ...createArticleDto, authorId: me.id },
            include: this.includeAuthor(query)
        });
    }

    replace(
        id: number,
        replaceArticleDto: ReplaceArticleDto,
        query: QueryParamArticleDto
    ) {
        return this.prisma.article.update({
            where: { id },
            data: replaceArticleDto,
            include: this.includeAuthor(query)
        });
    }

    update(
        id: number,
        updateArticleDto: UpdateArticleDto,
        query: QueryParamArticleDto
    ) {
        return this.prisma.article.update({
            where: { id },
            data: updateArticleDto,
            include: this.includeAuthor(query)
        });
    }

    remove(id: number) {
        return this.prisma.article.delete({ where: { id } });
    }
}
