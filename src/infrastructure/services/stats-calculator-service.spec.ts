// import { describe, it, expect, vi, beforeEach } from 'vitest'
// import { StatsCalculatorService } from '../stats-calculator-service'
// import type { ISkillsRepository } from '../../repositories/interfaces/skills-repository'
// import type { Category } from '@prisma/client'
// import type { SkillWithSkillTypes } from '../../repositories/types/skills-types'

// utilizar arquivos de seed para gerar mocks
// const fakeSkills: SkillWithSkillTypes[] = [
//   {
//     id: 'skill-1',
//     name: 'Fundamental Attack',
//     description: '',
//     skillGroup: 'fundamental',
//     skillTypes: [{ skillType: { type: 'attack' } }] as any,
//     playerSkillMonths: [],
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     id: 'skill-2',
//     name: 'Resource Defense',
//     description: '',
//     skillGroup: 'resource',
//     skillTypes: [{ skillType: { type: 'defense' } }] as any,
//     playerSkillMonths: [],
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   }
// ]

// describe('StatsCalculatorService', () => {
//   let skillsRepoMock: ISkillsRepository
//   let service: StatsCalculatorService

//   beforeEach(() => {
//     skillsRepoMock = {
//       findManyByModalityId: vi.fn().mockResolvedValue(fakeSkills)
//     } as unknown as ISkillsRepository

//     service = new StatsCalculatorService(skillsRepoMock)
//   })

//   it('should calculate correct stats with mixed categories', async () => {
//     const input = {
//       modalityId: 'mod-1',
//       skillsIdsWithCategory: [
//         { skillId: 'skill-1', category: 'advanced' as Category },  // 75
//         { skillId: 'skill-2', category: 'beginner'  as Category }  // 25
//       ]
//     }

//     const result = await service.calculate(input)

//     expect(result).toEqual({
//       fundamentalsScore: 75,
//       resourcesScore: 25,
//       attackScore: 0.9 * 75 + 0.1 * 0,  // Só tem atk no fundamental
//       defenseScore: 0.9 * 0 + 0.1 * 25, // Só tem def no resource
//       overallScore: 0.9 * 75 + 0.1 * 25
//     })
//   })

//   it('should default to none when category is missing', async () => {
//     const input = {
//       modalityId: 'mod-1',
//       skillsIdsWithCategory: []  // Nenhuma categoria enviada
//     }

//     const result = await service.calculate(input)

//     expect(result).toEqual({
//       fundamentalsScore: 0,
//       resourcesScore: 0,
//       attackScore: 0,
//       defenseScore: 0,
//       overallScore: 0
//     })
//   })
// })
