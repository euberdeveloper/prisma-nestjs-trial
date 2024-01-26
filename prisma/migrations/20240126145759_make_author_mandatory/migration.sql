/*
  Warnings:

  - Made the column `authorId` on table `article` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "article" DROP CONSTRAINT "article_authorId_fkey";

-- AlterTable
ALTER TABLE "article" ALTER COLUMN "authorId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "article" ADD CONSTRAINT "article_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
