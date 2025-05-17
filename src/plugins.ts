import fastifyCookie from '@fastify/cookie'
import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import { authRoutes } from '@routes/auth-routes'
import { playersRoutes } from '@routes/players-routes'
import { skillsRoutes } from '@routes/skills-routes'
import type { FastifyInstance } from 'fastify'

import { globalErrorHandler } from '@/infrastructure/http/global-error-handler'

import { env } from './env'

export function registerPlugins(app: FastifyInstance) {
  const corsOrigins =
    env.NODE_ENV !== 'production'
      ? [env.ORIGIN_URL, 'http://localhost:3000']
      : [env.ORIGIN_URL]

  app.register(fastifyCors, {
    origin: corsOrigins,
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
