-- CreateEnum
CREATE TYPE "Role" AS ENUM ('student', 'athlete', 'administrador');

-- CreateEnum
CREATE TYPE "Modality" AS ENUM ('futevolei', 'altinha');

-- CreateEnum
CREATE TYPE "PreferredSide" AS ENUM ('left', 'right');

-- CreateEnum
CREATE TYPE "DominantFoot" AS ENUM ('left', 'right', 'ambidextrous');

-- CreateEnum
CREATE TYPE "CardType" AS ENUM ('gold', 'silver', 'bronze', 'special');

-- CreateEnum
CREATE TYPE "PhysicalLabel" AS ENUM ('strong', 'agile', 'resilient', 'explosive', 'powerful', 'weak', 'slow', 'tired', 'injured');

-- CreateEnum
CREATE TYPE "MentalLabel" AS ENUM ('calm', 'focused', 'confident', 'stressed', 'provocative', 'resilient', 'distracted', 'insecure', 'anxious', 'shy');

-- CreateEnum
CREATE TYPE "SkillType" AS ENUM ('attack', 'defense');

-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "photo" TEXT,
    "age" INTEGER,
    "nationality" TEXT,
    "latitude" DECIMAL(65,30),
    "longitude" DECIMAL(65,30),
    "role" "Role" NOT NULL DEFAULT 'athlete',
    "preferredSide" "PreferredSide",
    "dominantFoot" "DominantFoot",
    "physical" "PhysicalLabel",
    "mental" "MentalLabel",
    "modality" "Modality"[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fundamental" (
    "name" TEXT NOT NULL,
    "abbreviation" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "skillType" "SkillType"[],
    "modality" "Modality"[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Fundamental_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "PlayerFundamental" (
    "id" TEXT NOT NULL,
    "fundamentalRating" INTEGER NOT NULL,
    "playerId" TEXT NOT NULL,
    "fundamentalName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlayerFundamental_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resource" (
    "name" TEXT NOT NULL,
    "abbreviation" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "skillType" "SkillType"[],
    "modality" "Modality"[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Resource_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "PlayerResource" (
    "id" TEXT NOT NULL,
    "hasResource" BOOLEAN NOT NULL,
    "playerId" TEXT NOT NULL,
    "resourceName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlayerResource_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Player_email_key" ON "Player"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Fundamental_name_key" ON "Fundamental"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Resource_name_key" ON "Resource"("name");

-- AddForeignKey
ALTER TABLE "PlayerFundamental" ADD CONSTRAINT "PlayerFundamental_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerFundamental" ADD CONSTRAINT "PlayerFundamental_fundamentalName_fkey" FOREIGN KEY ("fundamentalName") REFERENCES "Fundamental"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerResource" ADD CONSTRAINT "PlayerResource_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerResource" ADD CONSTRAINT "PlayerResource_resourceName_fkey" FOREIGN KEY ("resourceName") REFERENCES "Resource"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
