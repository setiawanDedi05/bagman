import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class QueryExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = HttpStatus.BAD_REQUEST;

    const driverError = (exception as any).driverError;

    if (driverError.code === '23505') {
      const detail = driverError.detail;

      if (detail.includes('username')) {
        response.status(status).json({
          statusCode: status,
          message: 'Username already exists.',
          error: 'Bad Request',
        });
      } else if (detail.includes('email')) {
        response.status(status).json({
          statusCode: status,
          message: 'Email already exists.',
          error: 'Bad Request',
        });
      } else {
        response.status(status).json({
          statusCode: status,
          message: 'Unique constraint violation.',
          error: 'Bad Request',
        });
      }
    } else {
      response.status(status).json({
        statusCode: status,
        message: 'Database error occurred.',
        error: 'Bad Request',
      });
    }
  }
}
