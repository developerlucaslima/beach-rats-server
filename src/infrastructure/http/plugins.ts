import fastifyCookie from '@fastify/cookie'
import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import { playerRoutes } from '@routes/players-routes'
import type { FastifyInstance } from 'fastify'

import { globalErrorHandler } from '@/infrastructure/http/global-error-handler'

import { env } from '../../env'

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
  app.register(playerRoutes, { prefix: '/players' })
}
