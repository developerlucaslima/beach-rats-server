import { addPlayerModalityController } from '@controllers/add-player-modality-controller'
import { verifyJwt } from '@middlewares/verify-jwt'
import { verifyRole } from '@middlewares/verify-role'
import type { FastifyInstance } from 'fastify'

import { authPlayerWithGoogleController } from '../controllers/auth-player-with-google-controller'
import { refreshTokenController } from '../controllers/refresh-token-controller'
import { signInPlayerController } from '../controllers/sign-in-player-controller'
import { signUpPlayerController } from '../controllers/sign-up-player-controller'

export async function playerRoutes(app: FastifyInstance) {
  /** Authenticate */
  app.post('/sign-up', signUpPlayerController)
  app.post('/sign-in', signInPlayerController)
  app.post('/auth/google', authPlayerWithGoogleController)

  /** Token Refresh */
  app.patch('/refresh-token', refreshTokenController)

  /** Authenticated */
  app.post(
    '/me/modalities',
    { onRequest: [verifyJwt, verifyRole('athlete')] },
    addPlayerModalityController,
  )
  app.get(
    '/me/monthly-stats',
    { onRequest: [verifyJwt, verifyRole('athlete')] },
    addPlayerModalityController,
  )
}
