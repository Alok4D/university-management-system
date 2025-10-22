import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utlis';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {};

  // default password set
  userData.password = password || (config.default_password as string);
  userData.role = 'student';

  // admission semester check
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );
  if (!admissionSemester) throw new Error('Invalid Academic Semester ID');

  // generate numeric ID
  const { numericId } = await generateStudentId(admissionSemester);
  userData.id = numericId; // শুধু numeric ID save হবে

  // create user
  const newUser = await User.create(userData);

  // create student
  if (Object.keys(newUser).length) {
    payload.id = numericId;
    payload.user = newUser._id;
  }

  const newStudent = await Student.create(payload);

  return newStudent;
};

export const UserServices = {
  createStudentIntoDB,
};
