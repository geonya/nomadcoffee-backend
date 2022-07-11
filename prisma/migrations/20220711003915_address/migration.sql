/*
  Warnings:

  - You are about to drop the column `latitude` on the `Cafe` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `Cafe` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Cafe" DROP COLUMN "latitude",
DROP COLUMN "longitude",
ADD COLUMN     "address" TEXT;
