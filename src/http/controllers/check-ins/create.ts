import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCheckInsUseCase } from '@/use-cases/factories/make-check-in-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createCheckInsParamsSchema = z.object({
    gymId: z.string().uuid(),
  })
  const creatCheckInBodySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { gymId } = createCheckInsParamsSchema.parse(request.params)
  const { latitude, longitude } = creatCheckInBodySchema.parse(request.body)
  const createGymUseCase = makeCheckInsUseCase()

  await createGymUseCase.execute({
    gymId,
    userId: request.user.sub,
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(201).send()
}
