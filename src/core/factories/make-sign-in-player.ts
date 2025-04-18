import { PrismaPlayersRepository } from "@/repositories/prisma/players-repository";
import { SignInPlayerUseCase } from "@/use-cases/sign-in-player-use-case";

export function makePlayerSignIn() {
  const playersRepository = new PrismaPlayersRepository();
  const playerSignInUseCase = new SignInPlayerUseCase(playersRepository);

  return playerSignInUseCase;
}
