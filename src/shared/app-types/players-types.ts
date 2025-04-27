export type Role = 'athlete' | 'administrator'
export type SubscriptionPlan = 'pro' | 'free' | 'premium'

export interface PlayerCreateParams {
  id?: string
  googleId?: string | null
  email: string
  isEmailVerified?: boolean
  username?: string | null
  name: string
  passwordHash?: string | null
  avatarUrl?: string | null
  age?: number | null
  bio?: string | null
  latitude?: number | null
  longitude?: number | null
  role?: Role
  subscriptionPlan?: SubscriptionPlan
  countryCode?: string | null
  physicalConditionName?: string | null
  mentalConditionName?: string | null
  mainModalityId?: string | null
  createdAt?: Date | string
  updatedAt?: Date | string
}

export interface PlayerUpdateParams {
  googleId?: string | null
  email?: string
  isEmailVerified?: boolean
  username?: string | null
  name?: string
  passwordHash?: string | null
  avatarUrl?: string | null
  age?: number | null
  bio?: string | null
  latitude?: number | null
  longitude?: number | null
  role?: Role
  subscriptionPlan?: SubscriptionPlan
  countryCode?: string | null
  physicalConditionName?: string | null
  mentalConditionName?: string | null
  mainModalityId?: string | null
}

export interface Player {
  id: string
  googleId: string | null
  email: string
  isEmailVerified: boolean
  username: string | null
  name: string
  passwordHash: string | null
  avatarUrl: string | null
  age: number | null
  bio: string | null
  latitude: number | null
  longitude: number | null
  role: Role
  subscriptionPlan: SubscriptionPlan
  countryCode: string | null
  physicalConditionName: string | null
  mentalConditionName: string | null
  mainModalityId: string | null
  createdAt: Date
  updatedAt: Date
}
