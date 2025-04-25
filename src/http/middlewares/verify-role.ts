import type { FastifyReply, FastifyRequest } from 'fastify'

export function verifyRole(roleToVerify: 'athlete' | 'administrador') {
	return async (request: FastifyRequest, reply: FastifyReply) => {
		const { role } = request.player

		if (role !== roleToVerify) {
			return reply.status(401).send({ message: 'Unauthorized.' })
		}
	}
}