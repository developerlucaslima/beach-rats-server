import type { FastifyReply } from 'fastify'
import { 
  COOKIE_SETTINGS, 
  ACCESS_TOKEN_EXPIRATION_SECONDS, 
  REFRESH_TOKEN_COOKIE_NAME, 
  REFRESH_TOKEN_EXPIRATION_SECONDS, 
  ACCESS_TOKEN_COOKIE_NAME 
} from './jwt-config'

export function setAuthCookies(reply: FastifyReply, accessToken: string, refreshToken: string) {
  reply.setCookie(ACCESS_TOKEN_COOKIE_NAME, accessToken, {
    ...COOKIE_SETTINGS,
    maxAge: ACCESS_TOKEN_EXPIRATION_SECONDS,
  })

  reply.setCookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
    ...COOKIE_SETTINGS,
    maxAge: REFRESH_TOKEN_EXPIRATION_SECONDS,
  })
}
