import type { Prisma } from "@prisma/client"

import { prisma } from "@/config/prisma"

import type { PlayersRepository } from "../players-repository"

export class PrismaPlayersRepository implements PlayersRepository {
	async createOnePlayer(data: Prisma.PlayerUncheckedCreateInput) {
		const player = await prisma.player.create({
			data,
		})

		return player
	}

	async findManyPlayers() {
		const players = await prisma.player.findMany()

		return players
	}

	async findOnePlayerById(id: string) {
		const player = await prisma.player.findUnique({
			where: {
				id,
			},
		})

		return player
	}

	async findOnePlayerByEmail(email: string) {
		const player = await prisma.player.findUnique({
			where: {
				email,
			},
		})

		return player
	}
}
