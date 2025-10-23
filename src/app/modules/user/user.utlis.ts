import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

const findLastStudentId = async () => {
  const lastStudent = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();

  return lastStudent?.id || null;
};

export const generateStudentId = async (payload: TAcademicSemester) => {
  const lastStudentId = await findLastStudentId();

  let currentId = '0000';

  if (lastStudentId) {
    const lastStudentYear = lastStudentId.substring(0, 4);
    const lastStudentCode = lastStudentId.substring(4, 6);
    const lastIncrement = lastStudentId.substring(6);

    if (lastStudentYear === payload.year && lastStudentCode === payload.code) {
      currentId = (parseInt(lastIncrement) + 1).toString().padStart(4, '0');
    } else {
      currentId = '0001';
    }
  } else {
    currentId = '0001';
  }

  const newStudentId = `${payload.year}${payload.code}${currentId}`;
  return newStudentId;
};
