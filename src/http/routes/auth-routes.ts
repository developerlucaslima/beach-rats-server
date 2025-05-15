import type { FastifyInstance } from 'fastify'

import { authPlayerWithGoogleController } from '../controllers/auth-player-with-google-controller'
import { refreshTokenController } from '../controllers/refresh-token-controller'
import { signInPlayerController } from '../controllers/sign-in-player-controller'
import { signUpPlayerController } from '../controllers/sign-up-player-controller'
import { signOutPlayerController } from '@controllers/sign-out-player-controller'

export async function authRoutes(app: FastifyInstance) {
  /** Authenticate */
  app.post('/sign-up', signUpPlayerController)
  app.post('/sign-in', signInPlayerController)
  app.post('/sign-out', signOutPlayerController)
  app.post('/google', authPlayerWithGoogleController)

  /** Token Refresh */
  app.patch('/refresh-token', refreshTokenController)
}
