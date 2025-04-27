import type { FastifyInstance } from 'fastify'

import { authPlayerWithGoogleController } from '../controllers/auth-player-with-google-controller'
import { refreshTokenController } from '../controllers/refresh-token-controller'
import { signInPlayerController } from '../controllers/sign-in-player-controller'
import { signUpPlayerController } from '../controllers/sign-up-player-controller'

export async function playerRoutes(app: FastifyInstance) {
  app.post('/sign-up-player', signUpPlayerController)
  app.post('/sign-in-player', signInPlayerController)
  app.post('/auth-player-google', authPlayerWithGoogleController)

  /** Token Refresh */
  app.patch('/refresh-token-player', refreshTokenController)

  /** Authenticated */
  // app.get('/me', { onRequest: [verifyJwt, verifyPlayerRole('PLAYER')] }, playerProfileController)
}
