/*
  Warnings:

  - Added the required column `createdAt` to the `Rol` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Rol` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Rol` ADD COLUMN `createdAt` DATETIME(3) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
