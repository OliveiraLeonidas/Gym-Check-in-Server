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

  // it('should hash user password upon registration', async () => {
  //   const { user } = await sut.execute({
  //     name: 'Joe doew',
  //     email: 'john.doew@email.com',
  //     password: '123456',
  //   })

  //   const isPasswordHashed = await compare('123456', user.password_hash)

  //   expect(isPasswordHashed).toBe(true)
  // })

  // it('should not be able to register with duplicate email', async () => {
  //   const email = 'johndow@gmail.com'

  //   await sut.execute({
  //     name: 'Joe doe',
  //     email,
  //     password: '123456',
  //   })

  //   await expect(
  //     sut.execute({
  //       name: 'Joe doe',
  //       email,
  //       password: '123456',
  //     }),
  //   ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  // })
})
