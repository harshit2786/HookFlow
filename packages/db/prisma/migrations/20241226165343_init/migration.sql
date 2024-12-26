/*
  Warnings:

  - You are about to drop the column `triggerId` on the `Zap` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[zapId]` on the table `Trigger` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `metaData` to the `Acions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zapId` to the `Trigger` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Zap` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Zap` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeStamp` to the `Zap` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Acions" DROP CONSTRAINT "Acions_zapId_fkey";

-- DropForeignKey
ALTER TABLE "Zap" DROP CONSTRAINT "Zap_triggerId_fkey";

-- DropIndex
DROP INDEX "Zap_triggerId_key";

-- AlterTable
ALTER TABLE "Acions" ADD COLUMN     "metaData" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "Trigger" ADD COLUMN     "zapId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Zap" DROP COLUMN "triggerId",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "timeStamp" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Trigger_zapId_key" ON "Trigger"("zapId");

-- AddForeignKey
ALTER TABLE "Trigger" ADD CONSTRAINT "Trigger_zapId_fkey" FOREIGN KEY ("zapId") REFERENCES "Zap"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Acions" ADD CONSTRAINT "Acions_zapId_fkey" FOREIGN KEY ("zapId") REFERENCES "Zap"("id") ON DELETE CASCADE ON UPDATE CASCADE;
