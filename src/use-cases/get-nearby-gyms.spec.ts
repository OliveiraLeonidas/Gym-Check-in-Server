import { it, describe, beforeEach, expect } from 'vitest'
import { InMemoryGymsRepository } from '@/repository/in-memory/in-memory-gyms-repository'
import { GetNearbyGymsUseCase } from './get-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: GetNearbyGymsUseCase

describe('Get nearby gyms use case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new GetNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to get nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near gym',
      description: null,
      phone: null,
      latitude: -21.961563,
      longitude: -47.465924,
    })

    await gymsRepository.create({
      title: 'Far gym',
      description: null,
      phone: null,
      latitude: -27.961563,
      longitude: -57.465924,
    })

    const { gyms } = await sut.execute({
      userLatitude: -21.9985673,
      userLongitude: -47.4253016,
    })

    expect(gyms.length).toBeGreaterThan(0)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near gym' })])
  })
})
