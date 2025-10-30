

class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(statusCode: number, message: string, isOperational = true) {
    super(message);

    this.statusCode = statusCode;
    this.isOperational = isOperational;

    // Proper prototype chain setup for built-in Error extension
    Object.setPrototypeOf(this, new.target.prototype);

    // Capture stack trace for debugging (only in development)
    Error.captureStackTrace(this);
  }
}

export default AppError;
