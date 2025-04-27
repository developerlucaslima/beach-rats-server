import { makeGetSkillsByModality } from '@factories/make-get-skills-by-modality'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

// Validação básica do input
const getSkillsByModalitySchema = z.object({
  modalityId: z.string(),
})

export async function getSkillsByModalityController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { modalityId } = getSkillsByModalitySchema.parse(request.params)

  const getSkillsByModalityUseCase = makeGetSkillsByModality()
  const { skillsByModalityId } = await getSkillsByModalityUseCase.execute({
    modalityId,
  })

  return reply.status(200).send({
    message: 'Skills retrieved successfully.',
    skills: skillsByModalityId,
  })
}
