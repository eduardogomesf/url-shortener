import {
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { UseCaseResponse } from '@/application/type';
import { ERROR_CODES } from '@/shared/constant';

const logger = new Logger('convertUseCaseResponseToHttp');

export const convertUseCaseResponseToHttp = (
  useCaseResponse: UseCaseResponse,
) => {
  const internalServerError = {
    message: 'Internal Server Error',
    error_code: 'INTERNAL_SERVER_ERROR',
  };

  if (!useCaseResponse) {
    // TO DO: review log structure
    logger.error(
      'convertUseCaseResponseToHttp was called without a proper use case response',
    );
    throw new InternalServerErrorException(internalServerError);
  }

  if (useCaseResponse?.success) {
    return useCaseResponse?.data ?? undefined;
  }

  const badRequestErrors: string[] = [
    ERROR_CODES.alreadyExists,
    ERROR_CODES.fieldValidationError,
  ];

  if (badRequestErrors.includes(useCaseResponse?.code)) {
    // TO DO: add log
    throw new BadRequestException({
      message: useCaseResponse.message ?? 'Bad Request Error',
      error_code: useCaseResponse.code,
    });
  }

  throw new InternalServerErrorException(internalServerError);
};
