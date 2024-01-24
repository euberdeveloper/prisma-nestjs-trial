import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    type UpsertArticleArgs = Parameters<typeof prisma.article.upsert>[0];
    const articlesBodys: UpsertArticleArgs[] = [
        {
            where: { title: 'Prisma Adds Support for MongoDB' },
            update: {},
            create: {
                title: 'Prisma Adds Support for MongoDB',
                body: 'Support for MongoDB has been one of the most requested features since the initial release of...',
                description:
                    "We are excited to share that today's Prisma ORM release adds stable support for MongoDB!",
                published: false
            }
        },
        {
            where: { title: "What's new in Prisma? (Q1/22)" },
            update: {},
            create: {
                title: "What's new in Prisma? (Q1/22)",
                body: 'Our engineers have been working hard, issuing new releases with many improvements...',
                description:
                    'Learn about everything in the Prisma ecosystem and community from January to March 2022.',
                published: true
            }
        }
    ];

    // for (const articleBody of articlesBodys) {
    //     await prisma.article.upsert(articleBody);
    // }

    const articles = await Promise.all(
        articlesBodys.map((article) => prisma.article.upsert(article))
    );

    console.log(articles);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
