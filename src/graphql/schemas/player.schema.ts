import { z } from 'zod'

export const createPlayerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  photo: z.string().optional(),
  age: z.number().int().min(0).max(120).optional(),
  role: z.enum(['professor', 'aluno', 'atleta', 'administrador']).optional(),
  modality: z.enum(['futevolei', 'altinha']).optional(),
  country: z.string().optional(),
  address: z.string().optional(),
  preferredSide: z.enum(['left', 'right']).optional(),
  dominantFoot: z.enum(['left', 'right', 'ambidextrous']).optional(),
  physical: z.enum([
    'forte',
    'agil',
    'resistente',
    'explosivo',
    'potente',
    'fraco',
    'lento',
    'cansado',
    'lesionado'
  ]).optional(),
  mental: z.enum([
    'frio',
    'concentrado',
    'confiante',
    'estressado',
    'provocador',
    'resiliente',
    'distraido',
    'inseguro',
    'ansioso',
    'timido'
  ]).optional(),
})

export type CreatePlayerInput = z.infer<typeof createPlayerSchema> 