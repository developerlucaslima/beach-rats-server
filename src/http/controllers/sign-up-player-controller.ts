import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

import { makePlayerSignUp } from "@/core/factories/make-sign-up-player"

const signUpPlayerSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
})

export async function signUpPlayerController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { name, email, password } = signUpPlayerSchema.parse(request.body)

  const signUpPlayerUseCase = makePlayerSignUp()
  const { player } = await signUpPlayerUseCase.execute({ name, email, password })

  return reply.status(201).send({
    message: 'Sign up successfully.',
    player: {
      id: player.id,
      name: player.name,
      email: player.email,
    },
  })
}
