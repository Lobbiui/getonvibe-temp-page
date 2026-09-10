CREATE TABLE "ModelRelease" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "legalName" TEXT NOT NULL,
    "dateOfBirth" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "streetAddress" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "signature" TEXT NOT NULL,
    "agreementText" TEXT NOT NULL,
    "agreementVersion" TEXT NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "signedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ModelRelease_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "ModelRelease_accountId_key" ON "ModelRelease"("accountId");

ALTER TABLE "ModelRelease" ADD CONSTRAINT "ModelRelease_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;
