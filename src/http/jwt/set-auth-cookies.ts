import type { FastifyReply } from 'fastify'

import {
  ACCESS_TOKEN_COOKIE_NAME,
  ACCESS_TOKEN_EXPIRATION_SECONDS,
  COOKIE_SETTINGS,
  REFRESH_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_EXPIRATION_SECONDS,
} from './jwt-config'

export function setAuthCookies(
  reply: FastifyReply,
  accessToken: string,
  refreshToken: string,
) {
  reply.setCookie(ACCESS_TOKEN_COOKIE_NAME, accessToken, {
    ...COOKIE_SETTINGS,
    maxAge: ACCESS_TOKEN_EXPIRATION_SECONDS,
  })

  reply.setCookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
    ...COOKIE_SETTINGS,
    maxAge: REFRESH_TOKEN_EXPIRATION_SECONDS,
  })
}
