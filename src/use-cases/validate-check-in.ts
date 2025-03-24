import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repository/check-ins-repository'
import { ResourcerNotFoundError } from './errors/resource-not-found-error'

interface ValidateCheckInUseCaseRequest {
  checkInId: string
}

interface ValidateCheckInUseCaseResponse {
  checkIn: CheckIn
}

export class ValidateCheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourcerNotFoundError()
    }

    checkIn.validated_at = new Date()
    await this.checkInsRepository.save(checkIn)

    return {
      checkIn,
    }
  }
}
