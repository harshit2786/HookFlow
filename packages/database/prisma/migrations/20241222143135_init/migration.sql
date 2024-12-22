-- CreateTable
CREATE TABLE "Zap" (
    "id" TEXT NOT NULL,
    "triggerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Zap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trigger" (
    "id" TEXT NOT NULL,
    "typeId" TEXT NOT NULL,

    CONSTRAINT "Trigger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Acions" (
    "id" TEXT NOT NULL,
    "typeId" TEXT NOT NULL,
    "zapId" TEXT NOT NULL,

    CONSTRAINT "Acions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AvailableActions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "AvailableActions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AvailableTriggers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "AvailableTriggers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Zap_triggerId_key" ON "Zap"("triggerId");

-- AddForeignKey
ALTER TABLE "Zap" ADD CONSTRAINT "Zap_triggerId_fkey" FOREIGN KEY ("triggerId") REFERENCES "Trigger"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Zap" ADD CONSTRAINT "Zap_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trigger" ADD CONSTRAINT "Trigger_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "AvailableTriggers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Acions" ADD CONSTRAINT "Acions_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "AvailableActions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Acions" ADD CONSTRAINT "Acions_zapId_fkey" FOREIGN KEY ("zapId") REFERENCES "Zap"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
