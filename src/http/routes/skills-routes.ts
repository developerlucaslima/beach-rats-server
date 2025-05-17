import { getSkillsByModalityController } from '@controllers/get-skills-by-modality-controller'
import { verifyJwt } from '@middlewares/verify-jwt'
import { verifyRole } from '@middlewares/verify-role'
import type { FastifyInstance } from 'fastify'

export async function skillsRoutes(app: FastifyInstance) {
  /** Authenticated */
  app.get(
    '/:modalityId',
    { onRequest: [verifyJwt, verifyRole('athlete')] },
    getSkillsByModalityController,
  )
}
