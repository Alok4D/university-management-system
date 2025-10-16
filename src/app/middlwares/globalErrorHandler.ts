/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import config from '../config';

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
): Response => {
  const statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
  const message = err.message || 'Something went wrong!';

  // ✅ Correct usage of config
  const stack = config.node_env === 'development' ? err.stack : undefined;

  // Handle Mongoose Validation Errors
  let simplifiedError = err;
  if (err.name === 'ValidationError') {
    simplifiedError = Object.values(err.errors)
      .map((el: any) => el.message)
      .join(', ');
  }

  return res.status(statusCode).json({
    success: false,
    message,
    error: simplifiedError,
    ...(stack && { stack }),
  });
};

export default globalErrorHandler;
