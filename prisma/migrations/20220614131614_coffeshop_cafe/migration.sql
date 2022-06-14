/*
  Warnings:

  - You are about to drop the column `coffeeShopId` on the `Like` table. All the data in the column will be lost.
  - You are about to drop the `CoffeeShop` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CoffeeShopPhoto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CategoryToCoffeeShop` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[cafeId,userId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cafeId` to the `Like` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CoffeeShop" DROP CONSTRAINT "CoffeeShop_userId_fkey";

-- DropForeignKey
ALTER TABLE "CoffeeShopPhoto" DROP CONSTRAINT "CoffeeShopPhoto_coffeeShopId_fkey";

-- DropForeignKey
ALTER TABLE "CoffeeShopPhoto" DROP CONSTRAINT "CoffeeShopPhoto_userId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_coffeeShopId_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToCoffeeShop" DROP CONSTRAINT "_CategoryToCoffeeShop_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToCoffeeShop" DROP CONSTRAINT "_CategoryToCoffeeShop_B_fkey";

-- DropIndex
DROP INDEX "Like_coffeeShopId_userId_key";

-- AlterTable
ALTER TABLE "Like" DROP COLUMN "coffeeShopId",
ADD COLUMN     "cafeId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "CoffeeShop";

-- DropTable
DROP TABLE "CoffeeShopPhoto";

-- DropTable
DROP TABLE "_CategoryToCoffeeShop";

-- CreateTable
CREATE TABLE "Cafe" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "description" TEXT,
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cafe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CafePhoto" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "cafeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "CafePhoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CafeToCategory" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CafeToCategory_AB_unique" ON "_CafeToCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_CafeToCategory_B_index" ON "_CafeToCategory"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Like_cafeId_userId_key" ON "Like"("cafeId", "userId");

-- AddForeignKey
ALTER TABLE "Cafe" ADD CONSTRAINT "Cafe_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CafePhoto" ADD CONSTRAINT "CafePhoto_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CafePhoto" ADD CONSTRAINT "CafePhoto_cafeId_fkey" FOREIGN KEY ("cafeId") REFERENCES "Cafe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_cafeId_fkey" FOREIGN KEY ("cafeId") REFERENCES "Cafe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CafeToCategory" ADD CONSTRAINT "_CafeToCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "Cafe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CafeToCategory" ADD CONSTRAINT "_CafeToCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
