import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUSer } from './auth.interface';
import bcrypt from 'bcrypt';

const loginUser = async (payload: TLoginUSer) => {
  // checking if the user is exists

  const isUserExists = await User.findOne({ id: payload?.id });

  if (!isUserExists) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found!');
  }
  // checking if ther user is already deleted

  const isDeleted = isUserExists?.isDeleted;

  if (isDeleted) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is deleted!');
  }

  // if the user is blocked
  const userStatus = isUserExists?.status;

  if (userStatus === 'blocked') {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked!');
  }

  // password checking if the correct

  const isPasswordMactch = await bcrypt.compare(
    payload?.password,
    isUserExists?.password,
  );
  console.log(isPasswordMactch);

  // access Granted : send AccessToken and Refresh token

  return {};
};

export const AuthServices = {
  loginUser,
};
