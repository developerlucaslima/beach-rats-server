import { createOnePlayerFactory } from "@/use-cases/factories/create-one-player"

export interface CreateOnePlayerProps {
  name: string;
  email: string;
  password: string
}

export async function createOnePlayerResolver({ name, email, password }: CreateOnePlayerProps) {
  try {
    const createOnePlayerUseCase = createOnePlayerFactory()

    const { player } = await createOnePlayerUseCase.execute({
      name,
      email,
      password,
    })

    return player

  } catch (err) {
    // if (err instanceof EmailNotAvailableException) {
    // 	return reply.status(err.code).send({ message: err.message })
    // }
    throw err
  }
}