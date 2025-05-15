import fastifyCookie from '@fastify/cookie'
import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import { playersRoutes } from '@routes/players-routes'
import { skillsRoutes } from '@routes/skills-routes'
import type { FastifyInstance } from 'fastify'

import { globalErrorHandler } from '@/infrastructure/http/global-error-handler'

import { env } from './env'
import { authRoutes } from '@routes/auth-routes'

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

  app.register(authRoutes, { prefix: '/auth' })
  app.register(playersRoutes, { prefix: '/players' })
  app.register(skillsRoutes, { prefix: '/skills' })
}
