import type { Player } from "@prisma/client";

export function mapAuthenticatedPlayerResponse(player: Player) {
  return {
    name: player.name,
    email: player.email,
    profileImage: player.profileImage,
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
