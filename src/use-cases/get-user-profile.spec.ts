import { it, describe, expect, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repository/in-memory/in-memory-users-repository'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourcerNotFoundError } from './errors/resource-not-found-error'
import { randomUUID } from 'crypto'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get User Profile Use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })

  it('should be able to get user profile', async () => {
    const createdUser = await usersRepository.create({
      name: 'Joe doew',
      email: 'john.doew@email.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(createdUser.id).toEqual(user.id)
    expect(createdUser.email).toEqual(user.email)
  })

  it('should not be able to get user profile with wrong id', async () => {
    await expect(
      sut.execute({
        userId: randomUUID(),
      }),
    ).rejects.toBeInstanceOf(ResourcerNotFoundError)
  })
})
