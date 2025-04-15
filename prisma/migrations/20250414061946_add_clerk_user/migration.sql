-- CreateTable
CREATE TABLE "ClerkUser" (
    "id" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "emailAddress" TEXT NOT NULL,
    "imageUrl" TEXT,
    "primaryEmail" TEXT,
    "primaryPhoneNumber" TEXT,
    "passwordEnabled" BOOLEAN NOT NULL DEFAULT false,
    "totpEnabled" BOOLEAN NOT NULL DEFAULT false,
    "backupCodeEnabled" BOOLEAN NOT NULL DEFAULT false,
    "twoFactorEnabled" BOOLEAN NOT NULL DEFAULT false,
    "banned" BOOLEAN NOT NULL DEFAULT false,
    "lastSignInAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "ClerkUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ClerkUser_emailAddress_key" ON "ClerkUser"("emailAddress");

-- CreateIndex
CREATE UNIQUE INDEX "ClerkUser_userId_key" ON "ClerkUser"("userId");

-- CreateIndex
CREATE INDEX "ClerkUser_emailAddress_idx" ON "ClerkUser"("emailAddress");

-- AddForeignKey
ALTER TABLE "ClerkUser" ADD CONSTRAINT "ClerkUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
