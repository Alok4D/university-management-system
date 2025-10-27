/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler } from 'express';
import httpStatus from 'http-status';
import config from '../config';
import { ZodError } from 'zod';
import { TErrorSource } from '../interface/error';

// 🧩 Zod Validation Error
const handleZodError = (error: ZodError) => {
  const errorSources: TErrorSource = error.issues.map(issue => ({
    path: issue.path.join('.') || '',
    message: issue.message,
  }));

  return {
    statusCode: httpStatus.BAD_REQUEST,
    message: 'Validation Error!',
    errorSources,
  };
};

// 🧩 Mongoose Validation Error
const handleMongooseValidationError = (error: any) => {
  const errorSources: TErrorSource = Object.values(error.errors).map((el: any) => {
    let message = el.message;

    if (el.kind === 'required') {
      message = `${el.path} field is required!`;
    } else if (el.kind === 'minlength') {
      message = `${el.path} is too short.`;
    } else if (el.kind === 'maxlength') {
      message = `${el.path} is too long.`;
    } else if (el.kind === 'enum') {
      message = `${el.path} must be one of the allowed values.`;
    }

    return {
      path: el.path,
      message,
    };
  });

  return {
    statusCode: httpStatus.BAD_REQUEST,
    message: 'Validation Error!',
    errorSources,
  };
};

// 🧩 Duplicate Key Error
const handleDuplicateKeyError = (error: any) => {
  const errorSources: TErrorSource = Object.keys(error.keyValue).map(key => {
    const value = error.keyValue[key];
    return {
      path: key,
      message: `${value} already exists. Please use a different ${key}.`,
    };
  });

  return {
    statusCode: httpStatus.CONFLICT,
    message: 'Duplicate Value Error!',
    errorSources,
  };
};

// 🧩 Cast Error (Invalid ObjectId)
const handleCastError = (error: any) => {
  const errorSources: TErrorSource = [
    {
      path: error.path,
      message: `Invalid ID: "${error.value}". Please provide a valid MongoDB ObjectId.`,
    },
  ];

  return {
    statusCode: httpStatus.BAD_REQUEST,
    message: 'Invalid ID format!',
    errorSources,
  };
};

// 🧩 BSONError (Invalid ObjectId before reaching Mongoose)
const handleBSONError = (error: any) => {
  const errorSources: TErrorSource = [
    {
      path: '',
      message: 'Invalid ID provided. Please make sure the ID is a valid MongoDB ObjectId.',
    },
  ];

  return {
    statusCode: httpStatus.BAD_REQUEST,
    message: 'Invalid MongoDB ID!',
    errorSources,
  };
};

// 🌍 Global Error Handler
const globalErrorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  let statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
  let message = err.message || 'Something went wrong!';
  let errorSources: TErrorSource = [{ path: '', message: 'Something went wrong!' }];

  // 🧩 Error type check
  if (err instanceof ZodError) {
    const simplified = handleZodError(err);
    statusCode = simplified.statusCode;
    message = simplified.message;
    errorSources = simplified.errorSources;
  } else if (err.name === 'ValidationError') {
    const simplified = handleMongooseValidationError(err);
    statusCode = simplified.statusCode;
    message = simplified.message;
    errorSources = simplified.errorSources;
  } else if (err.code === 11000) {
    const simplified = handleDuplicateKeyError(err);
    statusCode = simplified.statusCode;
    message = simplified.message;
    errorSources = simplified.errorSources;
  } else if (err.name === 'CastError') {
    const simplified = handleCastError(err);
    statusCode = simplified.statusCode;
    message = simplified.message;
    errorSources = simplified.errorSources;
  } else if (err.name === 'BSONError') {
    const simplified = handleBSONError(err);
    statusCode = simplified.statusCode;
    message = simplified.message;
    errorSources = simplified.errorSources;
  } else if (err.isOperational) {
    errorSources = [{ path: '', message: err.message }];
  }

  // 🧾 Clean response
  const responseData: Record<string, any> = {
    success: false,
    message,
    errorSources,
  };

  if (config.node_env === 'development') {
    responseData.stack = err.stack;
  }

  return res.status(statusCode).json(responseData);
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

// pattern
