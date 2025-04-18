import fastifyCookie from '@fastify/cookie'
import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import type { FastifyInstance } from 'fastify'

import { env } from './env'
import { globalErrorHandler } from './http/errors/global-error-handler'
import { playerRoutes } from './http/routes/players-routes'

export function registerPlugins(app: FastifyInstance) {
  app.register(fastifyCors, {
    origin: env.ORIGIN_URL,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
  })

  app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    sign: {
      expiresIn: '10m',
    },
  })

  app.register(fastifyCookie)
  app.setErrorHandler(globalErrorHandler)
  app.register(playerRoutes)
}