/*
  Warnings:

  - You are about to drop the column `name` on the `user` table. All the data in the column will be lost.
  - Added the required column `fullname` to the `user` table without a default value. This is not possible if the table is not empty.

  Edit:
  - Manually changed to a rename column
*/
-- AlterTable
ALTER TABLE "user"
RENAME COLUMN "name" TO "fullname";
