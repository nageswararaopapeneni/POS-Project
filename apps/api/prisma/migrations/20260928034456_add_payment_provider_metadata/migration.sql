-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "externalReference" TEXT,
ADD COLUMN     "provider" TEXT;

-- CreateIndex
CREATE INDEX "Payment_businessId_provider_idx" ON "Payment"("businessId", "provider");

-- CreateIndex
CREATE INDEX "Payment_businessId_externalReference_idx" ON "Payment"("businessId", "externalReference");
