import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    type UpsertRoleArgs = Parameters<typeof prisma.role.upsert>[0];
    const rolesBodies: UpsertRoleArgs[] = [
        {
            where: { name: 'root' },
            update: {},
            create: { name: 'root' }
        },
        {
            where: { name: 'admin' },
            update: {},
            create: { name: 'admin' }
        },
        {
            where: { name: 'user' },
            update: {},
            create: { name: 'user' }
        }
    ];
    const [rootRole, adminRole, userRole] = await Promise.all(
        rolesBodies.map((role) => prisma.role.upsert(role))
    );

    type UpsertUserArgs = Parameters<typeof prisma.user.upsert>[0];
    const usersBodies: UpsertUserArgs[] = [
        {
            where: { email: 'euberdeveloper+pntroot@gmail.com' },
            update: {},
            create: {
                email: 'euberdeveloper+pntroot@gmail.com',
                fullname: 'Eubero Euberis',
                password: 'password',
                roleId: rootRole.id
            }
        },
        {
            where: { email: 'euberdeveloper+pntadmin@gmail.com' },
            update: {},
            create: {
                email: 'euberdeveloper+pntadmin@gmail.com',
                fullname: 'Eubero Euberis',
                password: 'password',
                roleId: adminRole.id
            }
        },
        {
            where: { email: 'euberdeveloper+pnt1@gmail.com' },
            update: {},
            create: {
                email: 'euberdeveloper+pnt1@gmail.com',
                fullname: 'Eubero Euberis',
                password: 'password',
                roleId: userRole.id
            }
        },
        {
            where: { email: 'euberdeveloper+pnt2@gmail.com' },
            update: {},
            create: {
                email: 'euberdeveloper+pnt2@gmail.com',
                fullname: 'Euberino Euberetto',
                password: 'password',
                roleId: userRole.id
            }
        }
    ];
    const users = await Promise.all(
        usersBodies.map((user) => prisma.user.upsert(user))
    );

    console.log('Seeded users:');
    console.log(users);

    type UpsertArticleArgs = Parameters<typeof prisma.article.upsert>[0];
    const articlesBodies: UpsertArticleArgs[] = [
        {
            where: { title: 'Prisma Adds Support for MongoDB' },
            update: { authorId: users[0].id },
            create: {
                title: 'Prisma Adds Support for MongoDB',
                body: 'Support for MongoDB has been one of the most requested features since the initial release of...',
                description:
                    "We are excited to share that today's Prisma ORM release adds stable support for MongoDB!",
                published: false,
                authorId: users[0].id
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
                published: true,
                authorId: users[1].id
            }
        }
    ];

    const articles = await Promise.all(
        articlesBodies.map((article) => prisma.article.upsert(article))
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
