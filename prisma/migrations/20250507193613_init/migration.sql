-- CreateEnum
CREATE TYPE "Role" AS ENUM ('athlete', 'administrator');

-- CreateEnum
CREATE TYPE "SubscriptionPlan" AS ENUM ('free', 'premium', 'pro');

-- CreateEnum
CREATE TYPE "SkillGroupTag" AS ENUM ('fundamental', 'resource');

-- CreateEnum
CREATE TYPE "SkillTypeTag" AS ENUM ('attack', 'defense');

-- CreateEnum
CREATE TYPE "Side" AS ENUM ('right', 'left', 'both');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('none', 'beginner', 'intermediate', 'advanced', 'pro');

-- CreateEnum
CREATE TYPE "PlayerConditionType" AS ENUM ('physical', 'mental');

-- CreateTable
CREATE TABLE "players" (
    "id" TEXT NOT NULL,
    "googleId" TEXT,
    "email" TEXT NOT NULL,
    "isEmailVerified" BOOLEAN NOT NULL DEFAULT false,
    "username" TEXT,
    "name" TEXT NOT NULL,
    "passwordHash" TEXT,
    "avatarUrl" TEXT,
    "age" INTEGER,
    "bio" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "role" "Role" NOT NULL DEFAULT 'athlete',
    "subscriptionPlan" "SubscriptionPlan" NOT NULL DEFAULT 'free',
    "countryCode" TEXT,
    "physicalConditionName" TEXT,
    "mentalConditionName" TEXT,
    "mainModalityId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "players_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "countries" (
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "emoji" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "countries_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "player_conditions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "emoji" TEXT NOT NULL,
    "playerConditionType" "PlayerConditionType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "player_conditions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "modalities" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "modalities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skill_types" (
    "id" TEXT NOT NULL,
    "type" "SkillTypeTag" NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "skill_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skill_skill_type_relations" (
    "skillId" TEXT NOT NULL,
    "typeId" TEXT NOT NULL,

    CONSTRAINT "skill_skill_type_relations_pkey" PRIMARY KEY ("skillId","typeId")
);

-- CreateTable
CREATE TABLE "skills" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "modalityId" TEXT NOT NULL,
    "skillGroup" "SkillGroupTag" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "player_modalities" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "modalityId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "player_modalities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "player_modalities_months_stats" (
    "id" TEXT NOT NULL,
    "playerModalityId" TEXT NOT NULL,
    "month" TIMESTAMP(3) NOT NULL,
    "fundamentalsScore" INTEGER NOT NULL,
    "resourcesScore" INTEGER NOT NULL,
    "attackScore" INTEGER NOT NULL,
    "defenseScore" INTEGER NOT NULL,
    "overallScore" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "player_modalities_months_stats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "player_skills_months_stats" (
    "id" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "playerModalityMonthId" TEXT NOT NULL,
    "skillId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "player_skills_months_stats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "players_googleId_key" ON "players"("googleId");

-- CreateIndex
CREATE UNIQUE INDEX "players_email_key" ON "players"("email");

-- CreateIndex
CREATE UNIQUE INDEX "players_username_key" ON "players"("username");

-- CreateIndex
CREATE UNIQUE INDEX "player_conditions_name_key" ON "player_conditions"("name");

-- CreateIndex
CREATE UNIQUE INDEX "modalities_name_key" ON "modalities"("name");

-- CreateIndex
CREATE UNIQUE INDEX "skill_types_type_key" ON "skill_types"("type");

-- CreateIndex
CREATE UNIQUE INDEX "skills_name_modalityId_key" ON "skills"("name", "modalityId");

-- CreateIndex
CREATE INDEX "player_modalities_playerId_idx" ON "player_modalities"("playerId");

-- CreateIndex
CREATE UNIQUE INDEX "player_modalities_playerId_modalityId_key" ON "player_modalities"("playerId", "modalityId");

-- CreateIndex
CREATE INDEX "player_modalities_months_stats_playerModalityId_idx" ON "player_modalities_months_stats"("playerModalityId");

-- CreateIndex
CREATE INDEX "player_modalities_months_stats_month_idx" ON "player_modalities_months_stats"("month");

-- CreateIndex
CREATE INDEX "player_modalities_months_stats_createdAt_idx" ON "player_modalities_months_stats"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "player_modalities_months_stats_playerModalityId_month_key" ON "player_modalities_months_stats"("playerModalityId", "month");

-- CreateIndex
CREATE INDEX "player_skills_months_stats_playerModalityMonthId_idx" ON "player_skills_months_stats"("playerModalityMonthId");

-- CreateIndex
CREATE INDEX "player_skills_months_stats_skillId_idx" ON "player_skills_months_stats"("skillId");

-- CreateIndex
CREATE INDEX "player_skills_months_stats_createdAt_idx" ON "player_skills_months_stats"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "player_skills_months_stats_playerModalityMonthId_skillId_key" ON "player_skills_months_stats"("playerModalityMonthId", "skillId");

-- AddForeignKey
ALTER TABLE "players" ADD CONSTRAINT "players_countryCode_fkey" FOREIGN KEY ("countryCode") REFERENCES "countries"("code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "players" ADD CONSTRAINT "players_physicalConditionName_fkey" FOREIGN KEY ("physicalConditionName") REFERENCES "player_conditions"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "players" ADD CONSTRAINT "players_mentalConditionName_fkey" FOREIGN KEY ("mentalConditionName") REFERENCES "player_conditions"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "players" ADD CONSTRAINT "players_mainModalityId_fkey" FOREIGN KEY ("mainModalityId") REFERENCES "modalities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skill_skill_type_relations" ADD CONSTRAINT "skill_skill_type_relations_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "skills"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skill_skill_type_relations" ADD CONSTRAINT "skill_skill_type_relations_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "skill_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skills" ADD CONSTRAINT "skills_modalityId_fkey" FOREIGN KEY ("modalityId") REFERENCES "modalities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "player_modalities" ADD CONSTRAINT "player_modalities_modalityId_fkey" FOREIGN KEY ("modalityId") REFERENCES "modalities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "player_modalities" ADD CONSTRAINT "player_modalities_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "players"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "player_modalities_months_stats" ADD CONSTRAINT "player_modalities_months_stats_playerModalityId_fkey" FOREIGN KEY ("playerModalityId") REFERENCES "player_modalities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "player_skills_months_stats" ADD CONSTRAINT "player_skills_months_stats_playerModalityMonthId_fkey" FOREIGN KEY ("playerModalityMonthId") REFERENCES "player_modalities_months_stats"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "player_skills_months_stats" ADD CONSTRAINT "player_skills_months_stats_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "skills"("id") ON DELETE CASCADE ON UPDATE CASCADE;
