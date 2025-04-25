import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { ZodError } from 'zod'
import { InvalidCredentialsException } from '@/core/errors/invalid-credentials-exception'
import { EmailNotAvailableException } from '@/core/errors/email-not-available-exception'

export function globalErrorHandler(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply,
) {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error.',
      issues: error.errors,
    })
  }

  if (
    error instanceof InvalidCredentialsException ||
    error instanceof EmailNotAvailableException
  ) {
    return reply.status(error.code).send({ message: error.message } as never)
  }

  request.log.error(error, 'Unhandled Error')
  return reply.status(500).send({ message: 'Internal server error.' })
}
