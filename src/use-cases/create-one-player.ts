import type { Player } from '@prisma/client'
import { hash } from 'bcryptjs'

import type { PlayersRepository } from '@/repositories/players-repository'
import { EmailNotAvailableException } from '@/errors/email-not-available'

interface CreateOnePlayerUseCaseRequest {
	name: string
	email: string
	password: string
}

interface CreateOnePlayerUseCaseResponse {
	player: Player
}

export class CreateOnePlayerUseCase {
	constructor(private readonly playersRepository: PlayersRepository) { }

	async execute({
		name,
		email,
		password,
	}: CreateOnePlayerUseCaseRequest): Promise<CreateOnePlayerUseCaseResponse> {
		// It should hash player password upon registration.
		const passwordHash = await hash(password, 6)

		// It should prevent a player register with a duplicate email.
		const playerWithSameEmail = await this.playersRepository.findOnePlayerByEmail(email)
		if (playerWithSameEmail) {
			throw new EmailNotAvailableException()
		}

		// // It should prevent a player register with an invalid role.
		// if (!['MALE', 'FEMALE', 'BOTH'].includes(serviceGender)) {
		// 	throw new InvalidGenderException()
		// }

		// It should allow to register a player.
		const player = await this.playersRepository.createOnePlayer({
			name,
			email,
			passwordHash,
		})

		return {
			player,
		}
	}
}
