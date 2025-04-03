import type { Player, Prisma } from '@prisma/client'
import { hash } from 'bcryptjs'

import type { PlayersRepository } from '@/repositories/players-repository'
import { EmailNotAvailableException } from '@/errors/email-not-available'
import type { CreatePlayerInput } from '@/graphql/schemas/player.schema'

interface CreateOnePlayerUseCaseResponse {
	player: Player
}

export class CreateOnePlayerUseCase {
	constructor(private readonly playersRepository: PlayersRepository) { }

	async execute(input: CreatePlayerInput): Promise<CreateOnePlayerUseCaseResponse> {
		// It should hash player password upon registration.
		const passwordHash = await hash(input.password, 6)

		// It should prevent a player register with a duplicate email.
		const playerWithSameEmail = await this.playersRepository.findOnePlayerByEmail(input.email)
		if (playerWithSameEmail) {
			throw new EmailNotAvailableException()
		}

		// It should allow to register a player.
		const player = await this.playersRepository.createOnePlayer({
			name: input.name,
			email: input.email,
			passwordHash,
			photo: input.photo,
			age: input.age,
			modality: input.modality as unknown as Prisma.PlayerCreatemodalityInput,
			preferredSide: input.preferredSide,
			dominantFoot: input.dominantFoot,
		})

		return {
			player,
		}
	}
}
