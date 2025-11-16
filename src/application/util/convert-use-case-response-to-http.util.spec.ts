import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { convertUseCaseResponseToHttp } from './convert-use-case-response-to-http.util';

describe('convertUseCaseResponseToHttp', () => {
  it('should return response if success flag is true', () => {
    expect(
      convertUseCaseResponseToHttp({
        data: 'any response',
        success: true,
      }),
    ).toEqual('any response');
  });

  it('should throw an internal server error if no use case response is provided', () => {
    expect(() => convertUseCaseResponseToHttp(null)).toThrow(
      new InternalServerErrorException({
        message: 'Internal Server Error',
        error_code: 'INTERNAL_SERVER_ERROR',
      }),
    );
  });

  it('should throw an internal server error if use case error code is not mapped', () => {
    expect(() =>
      convertUseCaseResponseToHttp({
        code: 'ANY_ERROR',
        data: null,
        message: 'any message',
        success: false,
      }),
    ).toThrow(
      new InternalServerErrorException({
        message: 'Internal Server Error',
        error_code: 'INTERNAL_SERVER_ERROR',
      }),
    );
  });

  it('should throw a bad request error if provided code is mapped', () => {
    expect(() =>
      convertUseCaseResponseToHttp({
        code: 'ALREADY_EXISTS',
        data: null,
        message: 'Already exists',
        success: false,
      }),
    ).toThrow(
      new BadRequestException({
        message: 'Already exists',
        error_code: 'ALREADY_EXISTS',
      }),
    );
  });
});
