-- CreateTable
CREATE TABLE "Reconciliation" (
    "id" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "businessDate" DATE NOT NULL,
    "totalSales" DECIMAL(12,2) NOT NULL,
    "cashTotal" DECIMAL(12,2) NOT NULL,
    "upiTotal" DECIMAL(12,2) NOT NULL,
    "cardTotal" DECIMAL(12,2) NOT NULL,
    "otherTotal" DECIMAL(12,2) NOT NULL,
    "expectedCash" DECIMAL(12,2) NOT NULL,
    "actualCash" DECIMAL(12,2) NOT NULL,
    "cashDifference" DECIMAL(12,2) NOT NULL,
    "status" TEXT NOT NULL,
    "closedBy" TEXT,
    "closedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reconciliation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CashDrawerEvent" (
    "id" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "branchId" TEXT,
    "deviceId" TEXT,
    "userId" TEXT,
    "eventType" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "saleId" TEXT,
    "exceptionStatus" TEXT NOT NULL DEFAULT 'none',
    "openedAt" TIMESTAMP(3),
    "closedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CashDrawerEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Reconciliation_businessId_idx" ON "Reconciliation"("businessId");

-- CreateIndex
CREATE INDEX "Reconciliation_businessId_businessDate_idx" ON "Reconciliation"("businessId", "businessDate");

-- CreateIndex
CREATE UNIQUE INDEX "Reconciliation_businessId_businessDate_key" ON "Reconciliation"("businessId", "businessDate");

-- CreateIndex
CREATE INDEX "CashDrawerEvent_businessId_idx" ON "CashDrawerEvent"("businessId");

-- CreateIndex
CREATE INDEX "CashDrawerEvent_businessId_createdAt_idx" ON "CashDrawerEvent"("businessId", "createdAt");

-- CreateIndex
CREATE INDEX "CashDrawerEvent_businessId_exceptionStatus_idx" ON "CashDrawerEvent"("businessId", "exceptionStatus");

-- CreateIndex
CREATE INDEX "CashDrawerEvent_saleId_idx" ON "CashDrawerEvent"("saleId");

-- AddForeignKey
ALTER TABLE "Reconciliation" ADD CONSTRAINT "Reconciliation_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CashDrawerEvent" ADD CONSTRAINT "CashDrawerEvent_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CashDrawerEvent" ADD CONSTRAINT "CashDrawerEvent_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sale"("id") ON DELETE SET NULL ON UPDATE CASCADE;
