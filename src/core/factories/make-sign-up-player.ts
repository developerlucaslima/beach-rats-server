import { PrismaPlayersRepository } from "@/repositories/prisma/players-repository";
import { SignUpPlayerUseCase } from "@/use-cases/sign-up-player-use-case";

export function makeSignUpPlayer() {
  const prismaPlayersRepository = new PrismaPlayersRepository();
  const signUpPlayerUseCase = new SignUpPlayerUseCase(prismaPlayersRepository);

  return signUpPlayerUseCase;
}
