export const ACCESS_TOKEN_EXPIRATION_SECONDS = 60 * 15 // 15 minutos
export const REFRESH_TOKEN_EXPIRATION_SECONDS = 60 * 60 * 24 * 35 // 35 dias

export const REFRESH_TOKEN_COOKIE_NAME = 'refreshToken'

export const COOKIE_SETTINGS = {
  path: '/',
  httpOnly: true,
  secure: true,
  sameSite: 'strict' as const,
}
