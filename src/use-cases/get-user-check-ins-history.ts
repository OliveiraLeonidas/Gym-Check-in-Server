import type { CheckIn } from '@prisma/client'
import type { CheckInsRepository } from '@/repository/check-ins-repository'

interface GetUserCheckInsHistoryUseCaseRequest {
  userId: string
  page: number
}

interface GetUserCheckInsHistoryUseCaseResponse {
  checkIns: CheckIn[]
}

export class GetUserCheckInsHistoryUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: GetUserCheckInsHistoryUseCaseRequest): Promise<GetUserCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    )

    return {
      checkIns,
    }
  }
}
