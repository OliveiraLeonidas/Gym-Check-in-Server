import { it, describe, expect, beforeEach } from 'vitest'
import { CreateGymUseCase } from './create-gym'
import { InMemoryGymsRepository } from '@/repository/in-memory/in-memory-gyms-repository'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })
  it('should be able to create a gym', async () => {
    const { gym } = await sut.execute({
      title: 'Ruby on rail',
      description: 'Ruby Academy',
      phone: '',
      latitude: -21.961563,
      longitude: -47.465924,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
