/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

const findLastStudentNumericId = async () => {
  const lastStudent = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();

  // if student not  have, 0 return 
  return lastStudent?.id ? Number(lastStudent.id) : 0;
};

export const generateStudentId = async (
  semester: TAcademicSemester,
): Promise<{ numericId: string }> => {
  const lastId = await findLastStudentNumericId();
  const newIdNumber = lastId + 1;

  // 6 digit pad করা
  const numericId = newIdNumber.toString().padStart(6, '0');

  return { numericId };
};
