-- DropIndex
DROP INDEX `User_name_key` ON `User`;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `provider` VARCHAR(191) NULL,
    MODIFY `password` VARCHAR(191) NULL,
    MODIFY `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `active` BOOLEAN NOT NULL DEFAULT true,
    MODIFY `verificationToken` VARCHAR(191) NULL;
