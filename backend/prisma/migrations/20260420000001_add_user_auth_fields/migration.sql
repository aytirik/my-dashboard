-- AlterTable
ALTER TABLE "User" ADD COLUMN "password" TEXT NOT NULL DEFAULT '',
ADD COLUMN "role" TEXT NOT NULL DEFAULT 'user';

-- Remove the temporary default on password (future rows must supply it)
ALTER TABLE "User" ALTER COLUMN "password" DROP DEFAULT;
