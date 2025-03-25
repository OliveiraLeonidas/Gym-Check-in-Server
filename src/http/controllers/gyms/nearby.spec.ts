import request from 'supertest'
import { app } from '@/app'
import { describe, beforeAll, expect, it, afterAll } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/create-and-authenticate-user'

describe('Nearby Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search gyms', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Javascript gym',
        description: 'some description',
        phone: '199999999',
        latitude: -21.961563,
        longitude: -47.465924,
      })
    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Typescript gym',
        description: 'some description',
        phone: '199999999',
        latitude: -27.961563,
        longitude: -57.465924,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -21.961563,
        longitude: -47.465924,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({ title: 'Javascript gym' }),
    ])
  })
})
