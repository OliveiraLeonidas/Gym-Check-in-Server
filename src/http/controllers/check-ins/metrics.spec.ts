import request from 'supertest'
import { app } from '@/app'
import { describe, beforeAll, expect, it, afterAll } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('User Metrics (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get user check-ins count from metrics', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const user = await prisma.user.findFirstOrThrow()

    const gym = await prisma.gym.create({
      data: {
        title: 'Javascript Gym',
        latitude: -27.2092052,
        longitude: -49.6401091,
      },
    })

    await prisma.checkIn.createMany({
      data: [
        {
          gym_id: gym.id,
          user_id: user.id,
        },
        {
          gym_id: gym.id,
          user_id: user.id,
        },
        {
          gym_id: gym.id,
          user_id: user.id,
        },
      ],
    })

    const response = await request(app.server)
      .get(`/check-ins/metrics`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        userId: user.id,
      })

    expect(response.statusCode).toEqual(200)
    expect(response.body.checkInsCount).toEqual(3)
  })
})
