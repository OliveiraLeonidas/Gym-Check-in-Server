import { it, describe, expect, beforeEach, afterEach, vi } from 'vitest'
import { CheckInUseCase } from './check-ins'
import { InMemoryCheckInsRepository } from '@/repository/in-memory/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from '@/repository/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxNumberCheckInsError } from './errors/max-number-of-check-ins-error'
import { MaxDistanceError } from './errors/max-distance-error'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check ins use case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)
    vi.useFakeTimers()

    await gymsRepository.create({
      id: 'gym-01',
      title: 'JS GYM',
      description: '',
      phone: '',
      latitude: -21.9985673,
      longitude: -47.4253016,
    })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -21.9985673,
      userLongitude: -47.4253016,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -21.9985673,
      userLongitude: -47.4253016,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -21.9985673,
        userLongitude: -47.4253016,
      }),
    ).rejects.toBeInstanceOf(MaxNumberCheckInsError)
  })

  it('should be able to check in twice in different days', async () => {
    vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -21.9985673,
      userLongitude: -47.4253016,
    })

    vi.setSystemTime(new Date(2024, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -21.9985673,
      userLongitude: -47.4253016,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should be not able to check in on distant gym', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'JS GYM',
      description: '',
      phone: '',
      latitude: new Decimal(-21.961563),
      longitude: new Decimal(-47.465924),
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -25.9985673,
        userLongitude: -47.4253016,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
