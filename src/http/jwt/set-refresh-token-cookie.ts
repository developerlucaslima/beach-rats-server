import { COOKIE_SETTINGS } from '@/http/jwt/jwt-config'
import type { FastifyReply } from 'fastify'

interface SetTokenCookieProps {
  reply: FastifyReply,
  tokenName: string
  token: string,
  maxAge: number
}

export function setTokenCookie({ reply, tokenName, token, maxAge }: SetTokenCookieProps) {
  reply.setCookie(tokenName, token, {
    ...COOKIE_SETTINGS,
    maxAge,
  })
}
