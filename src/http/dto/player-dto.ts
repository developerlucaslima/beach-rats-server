import type { Player } from "@prisma/client";

export function mapAuthenticatedPlayerResponse(player: Omit<Player, 'passwordHash'>) {
  return {
    id: player.id,
    googleId: player.googleId,
    name: player.name,
    email: player.email,
    avatarUrl: player.avatarUrl,
    bio: player.bio,
    age: player.age,
    countryCode: player.countryCode,
    latitude: player.latitude,
    longitude: player.longitude,
    mainModalityId: player.mainModalityId,
    physicalConditionName: player.physicalConditionName,
    mentalConditionName: player.mentalConditionName,
  }
}
