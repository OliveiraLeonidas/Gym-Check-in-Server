import { PrismaCheckInsRepository } from '@/repository/prisma/prisma-check-ins-repository'
import { CheckInUseCase } from '../check-ins'
import { PrismaGymsRepository } from '@/repository/prisma/prisma-gyms-repository'

export function makeCheckInsUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new CheckInUseCase(checkInsRepository, gymsRepository)

  return useCase
}
