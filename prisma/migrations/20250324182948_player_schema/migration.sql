-- CreateEnum
CREATE TYPE "Role" AS ENUM ('professor', 'aluno', 'atleta', 'administrador');

-- CreateEnum
CREATE TYPE "Modality" AS ENUM ('futevolei', 'altinha');

-- CreateEnum
CREATE TYPE "PreferredSide" AS ENUM ('left', 'right');

-- CreateEnum
CREATE TYPE "DominantFoot" AS ENUM ('left', 'right', 'ambidextrous');

-- CreateEnum
CREATE TYPE "CardType" AS ENUM ('gold', 'silver', 'bronze', 'special');

-- CreateEnum
CREATE TYPE "PhysicalLabel" AS ENUM ('forte', 'agil', 'resistente', 'explosivo', 'potente', 'fraco', 'lento', 'cansado', 'lesionado');

-- CreateEnum
CREATE TYPE "MentalLabel" AS ENUM ('frio', 'concentrado', 'confiante', 'estressado', 'provocador', 'resiliente', 'distraido', 'inseguro', 'ansioso', 'timido');

-- CreateEnum
CREATE TYPE "SkillType" AS ENUM ('attack', 'defense');

-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "photo" TEXT,
    "age" INTEGER,
    "role" "Role" NOT NULL,
    "modality" "Modality" NOT NULL,
    "country" TEXT,
    "address" TEXT,
    "preferredSide" "PreferredSide" NOT NULL,
    "dominantFoot" "DominantFoot" NOT NULL,
    "physical" "PhysicalLabel" NOT NULL,
    "mental" "MentalLabel" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fundamental" (
    "name" TEXT NOT NULL,
    "emoji" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "modality" "Modality" NOT NULL,
    "type" "SkillType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Fundamental_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "PlayerFundamental" (
    "id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "playerId" TEXT NOT NULL,
    "fundamentalName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlayerFundamental_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resource" (
    "name" TEXT NOT NULL,
    "emoji" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "modality" "Modality" NOT NULL,
    "type" "SkillType" NOT NULL,
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

-- AddForeignKey
ALTER TABLE "PlayerFundamental" ADD CONSTRAINT "PlayerFundamental_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerFundamental" ADD CONSTRAINT "PlayerFundamental_fundamentalName_fkey" FOREIGN KEY ("fundamentalName") REFERENCES "Fundamental"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerResource" ADD CONSTRAINT "PlayerResource_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerResource" ADD CONSTRAINT "PlayerResource_resourceName_fkey" FOREIGN KEY ("resourceName") REFERENCES "Resource"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
