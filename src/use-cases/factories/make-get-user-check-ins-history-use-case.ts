import { PrismaCheckInsRepository } from '@/repository/prisma/prisma-check-ins-repository'
import { GetUserCheckInsHistoryUseCase } from '../get-user-check-ins-history'

export function makeGetUserCheckInHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new GetUserCheckInsHistoryUseCase(checkInsRepository)

  return useCase
}
