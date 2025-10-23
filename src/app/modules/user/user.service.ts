import httpStatus from 'http-status';
import mongoose from 'mongoose';
import config from '../../config';


import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { AcademicSemester } from './../academicSemester/academicSemester.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utlis';
import AppError from '../../middlwares/AppError';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {};

  // default password
  userData.password = password || config.default_password;
  userData.role = 'student';

  // find semester
  const admissionSemester = await AcademicSemester.findById(payload.admissionSemester);
  if (!admissionSemester) throw new AppError(httpStatus.BAD_REQUEST, 'Invalid Academic Semester');

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // generate student ID
    userData.id = await generateStudentId(admissionSemester);

    // create user
    const newUser = await User.create([userData], { session });
    if (!newUser.length) throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');

    // assign user ID to student
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    // create student
    const newStudent = await Student.create([payload], { session });
    if (!newStudent.length) throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');

    await session.commitTransaction();
    await session.endSession();

    return newStudent[0];
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw err;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
