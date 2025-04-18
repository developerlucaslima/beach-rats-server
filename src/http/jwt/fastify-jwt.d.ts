import '@fastify/jwt'
import type { $Enums } from '@prisma/client'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    payload: {
      role: $Enums.Role
      subscriptionPlan: $Enums.SubscriptionPlan
    }

    user: {
      sub: string
      role: $Enums.Role
      subscriptionPlan: $Enums.SubscriptionPlan
    }
  }
}