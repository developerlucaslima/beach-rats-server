-- CreateEnum
CREATE TYPE "Role" AS ENUM ('athlete', 'administrador');

-- CreateEnum
CREATE TYPE "SubscriptionPlan" AS ENUM ('free', 'premium', 'pro');

-- CreateEnum
CREATE TYPE "SkillGroupTag" AS ENUM ('fundamental', 'resource');

-- CreateEnum
CREATE TYPE "Side" AS ENUM ('right', 'left', 'both');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('beginner', 'intermediate', 'advanced', 'pro');

-- CreateEnum
CREATE TYPE "PlayerConditionType" AS ENUM ('physical', 'mental');

-- CreateTable
CREATE TABLE "players" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "bio" TEXT,
    "profileImage" TEXT,
    "age" INTEGER,
    "countryCode" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "role" "Role" NOT NULL DEFAULT 'athlete',
    "subscriptionPlan" "SubscriptionPlan" NOT NULL DEFAULT 'free',
    "mainModalityId" TEXT,
    "physicalConditionName" TEXT,
    "mentalConditionName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "players_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "countries" (
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "emoji" TEXT NOT NULL,

    CONSTRAINT "countries_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "player_conditions" (
    "name" TEXT NOT NULL,
    "emoji" TEXT NOT NULL,
    "playerConditionType" "PlayerConditionType" NOT NULL,

    CONSTRAINT "player_conditions_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "modalities" (
    "modalityId" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "modalities_pkey" PRIMARY KEY ("modalityId")
);

-- CreateTable
CREATE TABLE "skill_modality_relations" (
    "skillName" TEXT NOT NULL,
    "modalityId" TEXT NOT NULL,

    CONSTRAINT "skill_modality_relations_pkey" PRIMARY KEY ("skillName","modalityId")
);

-- CreateTable
CREATE TABLE "skill_types" (
    "skillTypeId" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "skill_types_pkey" PRIMARY KEY ("skillTypeId")
);

-- CreateTable
CREATE TABLE "skill_skill_type_relations" (
    "skillName" TEXT NOT NULL,
    "skillTypeId" TEXT NOT NULL,

    CONSTRAINT "skill_skill_type_relations_pkey" PRIMARY KEY ("skillName","skillTypeId")
);

-- CreateTable
CREATE TABLE "skills" (
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "skillGroup" "SkillGroupTag" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "skills_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "player_modality_stats" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "modalityId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "player_modality_stats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "player_modality_months" (
    "id" TEXT NOT NULL,
    "playerModalityId" TEXT NOT NULL,
    "month" TIMESTAMP(3) NOT NULL,
    "attack" INTEGER NOT NULL,
    "defense" INTEGER NOT NULL,
    "skills" INTEGER NOT NULL,
    "resources" INTEGER NOT NULL,
    "overall" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "player_modality_months_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "player_skill_months" (
    "id" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "playerModalityMonthId" TEXT NOT NULL,
    "skillName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "player_skill_months_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "players_email_key" ON "players"("email");

-- CreateIndex
CREATE UNIQUE INDEX "player_conditions_name_playerConditionType_key" ON "player_conditions"("name", "playerConditionType");

-- CreateIndex
CREATE INDEX "player_modality_stats_playerId_idx" ON "player_modality_stats"("playerId");

-- CreateIndex
CREATE INDEX "player_modality_months_playerModalityId_idx" ON "player_modality_months"("playerModalityId");

-- CreateIndex
CREATE INDEX "player_modality_months_month_idx" ON "player_modality_months"("month");

-- CreateIndex
CREATE INDEX "player_modality_months_createdAt_idx" ON "player_modality_months"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "player_modality_months_playerModalityId_month_key" ON "player_modality_months"("playerModalityId", "month");

-- CreateIndex
CREATE INDEX "player_skill_months_playerModalityMonthId_idx" ON "player_skill_months"("playerModalityMonthId");

-- CreateIndex
CREATE INDEX "player_skill_months_skillName_idx" ON "player_skill_months"("skillName");

-- CreateIndex
CREATE INDEX "player_skill_months_createdAt_idx" ON "player_skill_months"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "player_skill_months_playerModalityMonthId_skillName_key" ON "player_skill_months"("playerModalityMonthId", "skillName");

-- AddForeignKey
ALTER TABLE "players" ADD CONSTRAINT "players_countryCode_fkey" FOREIGN KEY ("countryCode") REFERENCES "countries"("code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "players" ADD CONSTRAINT "players_physicalConditionName_fkey" FOREIGN KEY ("physicalConditionName") REFERENCES "player_conditions"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "players" ADD CONSTRAINT "players_mentalConditionName_fkey" FOREIGN KEY ("mentalConditionName") REFERENCES "player_conditions"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "players" ADD CONSTRAINT "players_mainModalityId_fkey" FOREIGN KEY ("mainModalityId") REFERENCES "modalities"("modalityId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skill_modality_relations" ADD CONSTRAINT "skill_modality_relations_skillName_fkey" FOREIGN KEY ("skillName") REFERENCES "skills"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skill_modality_relations" ADD CONSTRAINT "skill_modality_relations_modalityId_fkey" FOREIGN KEY ("modalityId") REFERENCES "modalities"("modalityId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skill_skill_type_relations" ADD CONSTRAINT "skill_skill_type_relations_skillName_fkey" FOREIGN KEY ("skillName") REFERENCES "skills"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skill_skill_type_relations" ADD CONSTRAINT "skill_skill_type_relations_skillTypeId_fkey" FOREIGN KEY ("skillTypeId") REFERENCES "skill_types"("skillTypeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "player_modality_stats" ADD CONSTRAINT "player_modality_stats_modalityId_fkey" FOREIGN KEY ("modalityId") REFERENCES "modalities"("modalityId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "player_modality_stats" ADD CONSTRAINT "player_modality_stats_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "players"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "player_modality_months" ADD CONSTRAINT "player_modality_months_playerModalityId_fkey" FOREIGN KEY ("playerModalityId") REFERENCES "player_modality_stats"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "player_skill_months" ADD CONSTRAINT "player_skill_months_playerModalityMonthId_fkey" FOREIGN KEY ("playerModalityMonthId") REFERENCES "player_modality_months"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "player_skill_months" ADD CONSTRAINT "player_skill_months_skillName_fkey" FOREIGN KEY ("skillName") REFERENCES "skills"("name") ON DELETE CASCADE ON UPDATE CASCADE;
