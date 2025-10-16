import { TStudent } from './student.interface';
import { Student } from './student.model';

//   return result; // build in static method

//   const student = new Student(studentData); // create an instance

//   if(await student.isUserExists(studentData.id)){
//     throw new Error("User already exists!")
//   }
//   const result = await student.save(); // build in instance method

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  //   const result = await Student.findOne({ id });
  const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};

const updateSingleStudentFromDB = async (
  id: string,
  payload: Partial<TStudent>,
) => {
  const result = await Student.findOneAndUpdate(
    { id },
    { $set: payload },
    { new: true, runValidators: true },
  );
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateSingleStudentFromDB,
};
