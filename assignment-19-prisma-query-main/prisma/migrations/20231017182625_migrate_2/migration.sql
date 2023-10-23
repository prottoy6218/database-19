/*
  Warnings:

  - You are about to alter the column `lastLoginAt` on the `user` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `cart` MODIFY `createAt` DATETIME(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    MODIFY `updateAt` DATETIME(6) NULL;

-- AlterTable
ALTER TABLE `category` MODIFY `createAt` DATETIME(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    MODIFY `updateAt` DATETIME(6) NULL;

-- AlterTable
ALTER TABLE `order` MODIFY `createAt` DATETIME(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    MODIFY `updateAt` DATETIME(6) NULL;

-- AlterTable
ALTER TABLE `product` MODIFY `startsAt` DATETIME(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    MODIFY `endsAt` DATETIME(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    MODIFY `createAt` DATETIME(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    MODIFY `updateAt` DATETIME(6) NULL;

-- AlterTable
ALTER TABLE `product_meta` MODIFY `createAt` DATETIME(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    MODIFY `updateAt` DATETIME(6) NULL;

-- AlterTable
ALTER TABLE `product_review` MODIFY `createAt` DATETIME(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    MODIFY `updateAt` DATETIME(6) NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `lastLoginAt` DATETIME NULL,
    MODIFY `createAt` DATETIME(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
    MODIFY `updateAt` DATETIME(6) NULL;
