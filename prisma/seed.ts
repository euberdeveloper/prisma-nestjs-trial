import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    type UpsertUserArgs = Parameters<typeof prisma.user.upsert>[0];
    const usersBodys: UpsertUserArgs[] = [
        {
            where: { email: 'euberdeveloper+pnt1@gmail.com' },
            update: {},
            create: {
                email: 'euberdeveloper+pnt1@gmail.com',
                fullname: 'Eubero Euberis',
                password: 'password'
            }
        },
        {
            where: { email: 'euberdeveloper+pnt2@gmail.com' },
            update: {},
            create: {
                email: 'euberdeveloper+pnt2@gmail.com',
                fullname: 'Euberino Euberetto',
                password: 'password'
            }
        }
    ];
    const users = await Promise.all(
        usersBodys.map((user) => prisma.user.upsert(user))
    );

    console.log('Seeded users:');
    console.log(users);

    type UpsertArticleArgs = Parameters<typeof prisma.article.upsert>[0];
    const articlesBodys: UpsertArticleArgs[] = [
        {
            where: { title: 'Prisma Adds Support for MongoDB' },
            update: { authorId: users[0].id },
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
            update: { authorId: users[1].id },
            create: {
                title: "What's new in Prisma? (Q1/22)",
                body: 'Our engineers have been working hard, issuing new releases with many improvements...',
                description:
                    'Learn about everything in the Prisma ecosystem and community from January to March 2022.',
                published: true
            }
        }
    ];

    const articles = await Promise.all(
        articlesBodys.map((article) => prisma.article.upsert(article))
    );

    console.log('Seeded articles:');
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
