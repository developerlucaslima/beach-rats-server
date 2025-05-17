import '@fastify/jwt'

import type { Role } from '@app-types/players-types'
import type { $Enums } from '@prisma/client'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    payload: {
      role: Role
      subscriptionPlan: $Enums.SubscriptionPlan
    }

    user: {
      sub: string
      role: Role
      subscriptionPlan: $Enums.SubscriptionPlan
    }
  }
}
