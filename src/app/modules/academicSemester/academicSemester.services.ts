import { Types } from 'mongoose';
import {
  TAcademicSemester,
  TAcademicSemesterNameCodeMapper,
} from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const getAllAcademicSemester = async () => {
  const result = await AcademicSemester.find();
  const total = await AcademicSemester.countDocuments();
  return {
    total,
    result,
  };
};

const getSingleAcademicSemester = async (id: string) => {
  const objectId = new Types.ObjectId(id);
  const result = await AcademicSemester.findById(objectId);
  return result;
};

export const academicSemesterNameCodeMapper: TAcademicSemesterNameCodeMapper = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  // semester name --> semester code
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid Semester Code');
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

const updateAcademicSemesterIntoDB = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error('Invalid Semester Code');
  }
  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemester,
  getSingleAcademicSemester,
  updateAcademicSemesterIntoDB,
};
