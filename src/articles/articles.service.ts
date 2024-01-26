import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ReplaceArticleDto } from './dto/replace-article.dto';

@Injectable()
export class ArticlesService {
    constructor(private prisma: PrismaService) {}

    findPublished() {
        return this.prisma.article.findMany({ where: { published: true } });
    }

    findDrafts() {
        return this.prisma.article.findMany({ where: { published: false } });
    }

    findOne(id: number) {
        return this.prisma.article.findUniqueOrThrow({ where: { id } });
    }

    create(createArticleDto: CreateArticleDto) {
        return this.prisma.article.create({ data: createArticleDto });
    }

    replace(id: number, replaceArticleDto: ReplaceArticleDto) {
        return this.prisma.article.update({
            where: { id },
            data: replaceArticleDto
        });
    }

    update(id: number, updateArticleDto: UpdateArticleDto) {
        return this.prisma.article.update({
            where: { id },
            data: updateArticleDto
        });
    }

    remove(id: number) {
        return this.prisma.article.delete({ where: { id } });
    }
}
