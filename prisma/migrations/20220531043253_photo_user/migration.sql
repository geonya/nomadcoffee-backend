/*
  Warnings:

  - Added the required column `userId` to the `CoffeeShopPhoto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CoffeeShopPhoto" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "CoffeeShopPhoto" ADD CONSTRAINT "CoffeeShopPhoto_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
