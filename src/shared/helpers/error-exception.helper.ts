import { HttpException, HttpStatus } from '@nestjs/common';

type ErrorParams = {
  error: string;
  message?: string;
  status?: number;
};

export function createError(
  error: string,
  message?: string,
  status?: number,
): HttpException;
export function createError(params: ErrorParams): HttpException;

export function createError(
  errorOrParams: string | ErrorParams,
  message?: string,
  status: number = HttpStatus.UNPROCESSABLE_ENTITY,
): HttpException {
  if (typeof errorOrParams === 'string') {
    return new HttpException(
      {
        error: errorOrParams,
        message,
        status,
      },
      status,
    );
  }

  if (!errorOrParams.status) {
    errorOrParams.status = HttpStatus.UNPROCESSABLE_ENTITY;
  }

  return new HttpException(errorOrParams, errorOrParams.status);
}
