import type { Prisma } from "@prisma/client";

export const countries: Prisma.CountryCreateInput[] = [
  { code: 'BR', name: 'Brazil', emoji: '🇧🇷' },
  { code: 'AR', name: 'Argentina', emoji: '🇦🇷' },
  { code: 'CO', name: 'Colombia', emoji: '🇨🇴' },
  { code: 'CL', name: 'Chile', emoji: '🇨🇱' },
  { code: 'MX', name: 'Mexico', emoji: '🇲🇽' },
  { code: 'PE', name: 'Peru', emoji: '🇵🇪' },
  { code: 'VE', name: 'Venezuela', emoji: '🇻🇪' },
  { code: 'EC', name: 'Ecuador', emoji: '🇪🇨' },
  { code: 'UY', name: 'Uruguay', emoji: '🇺🇾' },
  { code: 'BO', name: 'Bolivia', emoji: '🇧🇴' },
  { code: 'PY', name: 'Paraguay', emoji: '🇵🇾' },
  { code: 'CR', name: 'Costa Rica', emoji: '🇨🇷' },
  { code: 'PA', name: 'Panama', emoji: '🇵🇦' },
  { code: 'GT', name: 'Guatemala', emoji: '🇬🇹' },
  { code: 'HN', name: 'Honduras', emoji: '🇭🇳' },
  { code: 'NI', name: 'Nicaragua', emoji: '🇳🇮' },
  { code: 'SV', name: 'El Salvador', emoji: '🇸🇻' },
  { code: 'DO', name: 'Dominican Republic', emoji: '🇩🇴' },
  { code: 'CU', name: 'Cuba', emoji: '🇨🇺' },
  { code: 'US', name: 'United States', emoji: '🇺🇸' },
]