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
  // 🔹 Default values
  let statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
  let message = err.message || 'Something went wrong!';

  // 🔹 Default error info (for development)
  let errorDetails: any = {};

  // ✅ Handle known Mongoose validation errors
  if (err.name === 'ValidationError') {
    statusCode = httpStatus.BAD_REQUEST;
    message = 'Validation Error';
    errorDetails = Object.values(err.errors)
      .map((el: any) => el.message)
      .join(', ');
  }

  // ✅ Handle duplicate key error (E11000)
  else if (err.code === 11000) {
    statusCode = httpStatus.CONFLICT;
    message = 'Duplicate field value entered!';
    errorDetails = err.keyValue;
  }

  // ✅ Handle invalid ObjectId (CastError)
  else if (err.name === 'CastError') {
    statusCode = httpStatus.BAD_REQUEST;
    message = `Invalid ${err.path}: ${err.value}`;
  }

  // ✅ Handle custom AppError
  else if (err.isOperational) {
    message = err.message;
  }

  // ✅ Handle unhandled/unexpected errors gracefully (no crash)
  else {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = 'Internal server error occurred!';
    errorDetails = config.node_env === 'development' ? err.stack : null;
  }

  // 🔹 Final JSON Response
  return res.status(statusCode).json({
    success: false,
    message,
    ...(config.node_env === 'development' &&
      errorDetails && { error: errorDetails }),
  });
};

export default globalErrorHandler;

/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import { NextFunction, Request, Response } from 'express';
// import httpStatus from 'http-status';
// import config from '../config';

// const globalErrorHandler = (
//   err: any,
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ): Response => {
//   // Default fallback
//   const statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
//   const message = err.message || 'Something went wrong!';

//   // Only show stack in development
//   const stack = config.node_env === 'development' ? err.stack : undefined;

//   // ✅ Simplify Mongoose ValidationError messages
//   let simplifiedError = err;

//   if (err.name === 'ValidationError') {
//     simplifiedError = Object.values(err.errors)
//       .map((el: any) => el.message)
//       .join(', ');
//   }

//   // ✅ Handle MongoDB duplicate key error (E11000)
//   if (err.code === 11000) {
//     simplifiedError = `Duplicate field value entered: ${Object.keys(
//       err.keyValue,
//     ).join(', ')}`;
//   }

//   // ✅ Handle CastError (invalid ObjectId)
//   if (err.name === 'CastError') {
//     simplifiedError = `Invalid ${err.path}: ${err.value}`;
//   }

//   // Final response
//   return res.status(statusCode).json({
//     success: false,
//     message,
//     error: {
//       statusCode,
//       isOperational: err.isOperational ?? false,
//       ...(config.node_env === 'development' && { details: simplifiedError }),
//     },
//     ...(stack && { stack }), // stack only in development
//   });
// };

// export default globalErrorHandler;
