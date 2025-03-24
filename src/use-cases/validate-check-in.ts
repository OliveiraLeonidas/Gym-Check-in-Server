import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repository/check-ins-repository'
import { ResourcerNotFoundError } from './errors/resource-not-found-error'
import dayjs from 'dayjs'
import { LateChackInValidationError } from './errors/late-check-in-validation.-error'

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

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    )

    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateChackInValidationError()
    }

    checkIn.validated_at = new Date()
    await this.checkInsRepository.save(checkIn)

    return {
      checkIn,
    }
  }
}
