/* eslint-disable @typescript-eslint/no-unused-vars */
import { Response, NextFunction } from 'express';

interface ErrorResponse {
  error: {
    code: number;
    message: string;
  };
}

export const sendErrorResponse = (
  res: Response,
  status: number,
  message: string,
) => {
  const errorResponse: ErrorResponse = {
    error: {
      code: status,
      message: message,
    },
  };
  return res.status(status).json(errorResponse);
};

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error('Error:', err);
  sendErrorResponse(res, 500, 'Internal server error');
};
