import type { FastifyReply } from 'fastify'
import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
  COOKIE_SETTINGS,
} from './jwt-config'

export function clearAuthCookies(reply: FastifyReply) {
  reply.clearCookie(ACCESS_TOKEN_COOKIE_NAME, {
    path: COOKIE_SETTINGS.path,
  })

  reply.clearCookie(REFRESH_TOKEN_COOKIE_NAME, {
    path: COOKIE_SETTINGS.path,
  })
}
