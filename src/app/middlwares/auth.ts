
import { Request, Response, NextFunction } from 'express';
import catchAsync from '../utlis/catchAsync';
import AppError from '../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken'
import config from '../config';
import { JwtPayload } from 'jsonwebtoken';
import { TUserRole } from '../modules/user/user.interface';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized!');
    }

    try {
      // verify token
      const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;

      console.log('✅ Decoded JWT payload:', decoded);

      if(requiredRoles && !requiredRoles.includes(decoded?.role)){
         throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid or expired token!');
      }

   // set data req.body
      req.user = decoded as JwtPayload;

      next();
    } catch (err) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid or expired token!');
    }
  });
};

export default auth;
