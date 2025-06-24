/*
  Warnings:

  - You are about to drop the `delivery_addresses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "delivery_addresses" DROP CONSTRAINT "delivery_addresses_user_id_fkey";

-- DropForeignKey
ALTER TABLE "survey_responses" DROP CONSTRAINT "survey_responses_user_id_fkey";

-- DropTable
DROP TABLE "delivery_addresses";

-- DropTable
DROP TABLE "users";

-- DropEnum
DROP TYPE "UserRole";
