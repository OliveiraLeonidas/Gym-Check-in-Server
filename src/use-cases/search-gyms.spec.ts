import { it, describe, beforeEach, expect } from 'vitest'
import { InMemoryGymsRepository } from '@/repository/in-memory/in-memory-gyms-repository'
import { SearchGymsUseCase } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Get user check ins use case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'Javascript',
      description: '',
      phone: '',
      latitude: -21.961563,
      longitude: -47.465924,
    })

    await gymsRepository.create({
      title: 'Typescript',
      description: '',
      phone: '',
      latitude: -23.961563,
      longitude: -57.465924,
    })

    await gymsRepository.create({
      title: 'Ruby',
      description: '',
      phone: '',
      latitude: -22.961563,
      longitude: -46.465924,
    })

    const { gyms } = await sut.execute({
      query: 'Typescript',
      page: 1,
    })

    expect(gyms.length).toBeGreaterThan(0)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Typescript' })])
  })

  it('should be able to get paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Ruby gym-${i}`,
        description: '',
        phone: '',
        latitude: -22.961563,
        longitude: -46.465924,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Ruby',
      page: 2,
    })

    expect(gyms.length).toBeGreaterThan(0)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Ruby gym-21' }),
      expect.objectContaining({ title: 'Ruby gym-22' }),
    ])
  })
})
