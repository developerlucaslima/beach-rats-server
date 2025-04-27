import type { FastifyReply } from 'fastify'

import { COOKIE_SETTINGS } from '@/http/jwt/jwt-config'

interface SetTokenCookieProps {
  reply: FastifyReply
  tokenName: string
  token: string
  maxAge: number
}

export function setTokenCookie({
  reply,
  tokenName,
  token,
  maxAge,
}: SetTokenCookieProps) {
  reply.setCookie(tokenName, token, {
    ...COOKIE_SETTINGS,
    maxAge,
  })
}
