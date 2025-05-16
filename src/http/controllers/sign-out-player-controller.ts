import { clearAuthCookies } from '@jwt/clear-auth-cookies'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function signOutPlayerController(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  clearAuthCookies(reply)

  return reply.status(200).send({
    message: 'Logged out successfully.',
  })
}
