import { BaseException } from '@errors/base-exception'
import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { ZodError } from 'zod'

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

  if (error instanceof BaseException) {
    return reply.status(error.code).send({ message: error.message } as never)
  }

  request.log.error(error, 'Unhandled Error')
  return reply.status(500).send({ message: 'Internal server error.' })
}
