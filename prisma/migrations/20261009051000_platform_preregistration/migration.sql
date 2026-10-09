CREATE TYPE "LeadConfirmationStatus" AS ENUM ('PENDING', 'SENT', 'FAILED', 'SKIPPED');

CREATE TABLE "PlatformLead" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "audienceInterests" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    "creatorOpportunityInterests" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    "website" TEXT,
    "sourceFirst" TEXT,
    "sourceLatest" TEXT,
    "consentAt" TIMESTAMP(3) NOT NULL,
    "confirmationStatus" "LeadConfirmationStatus" NOT NULL DEFAULT 'PENDING',
    "confirmationError" TEXT,
    "lastSubmittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlatformLead_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "PlatformLead_email_key" ON "PlatformLead"("email");
