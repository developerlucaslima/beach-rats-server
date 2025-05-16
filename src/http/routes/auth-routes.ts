import { authPlayerWithGoogleOneTapController } from '@controllers/auth-player-with-google-one-tap-controller'
import { signOutPlayerController } from '@controllers/sign-out-player-controller'
import type { FastifyInstance } from 'fastify'

import { authPlayerWithGoogleController } from '../controllers/auth-player-with-google-controller'
import { refreshTokenController } from '../controllers/refresh-token-controller'
import { signInPlayerController } from '../controllers/sign-in-player-controller'
import { signUpPlayerController } from '../controllers/sign-up-player-controller'

export async function authRoutes(app: FastifyInstance) {
  /** Authenticate */
  app.post('/sign-up', signUpPlayerController)
  app.post('/sign-in', signInPlayerController)
  app.post('/sign-out', signOutPlayerController)
  app.post('/google', authPlayerWithGoogleController)
  app.post('/google-one-tap', authPlayerWithGoogleOneTapController)

  /** Token Refresh */
  app.patch('/refresh-token', refreshTokenController)
}
