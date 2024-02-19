import { ApiProperty } from '@nestjs/swagger';
import { Article } from '@prisma/client';

import { RawUserEntity } from 'src/users/entities/raw-user.entity';
import { UserEntity } from 'src/users/entities/user.entity';

export class ArticleEntity implements Article {
    @ApiProperty()
    id: number;

    @ApiProperty()
    title: string;

    @ApiProperty({ required: false, nullable: true, type: String })
    description: string | null;

    @ApiProperty()
    body: string;

    @ApiProperty()
    published: boolean;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty()
    authorId: number;

    @ApiProperty({ required: false, nullable: true, type: UserEntity })
    author?: UserEntity | null;

    constructor({
        author,
        ...data
    }: Partial<
        Omit<ArticleEntity, 'author'> & {
            author: RawUserEntity | UserEntity;
        }
    >) {
        Object.assign(this, data);

        if (author) {
            this.author = new UserEntity(author);
        }
    }
}
