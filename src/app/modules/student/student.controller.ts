/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { StudentServices } from './student.service';
import sendResponse from '../../utlis/sendResponse';
import catchAsync from '../../utlis/catchAsync';

const getAllStudents = catchAsync(async (req, res) => {

  const result = await StudentServices.getAllStudentsFromDB(req.query);
  console.log(req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student are retriveved successfully',
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.getSingleStudentFromDB(studentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is retriveved successfully',
    data: result,
  });
});

const updateSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const updatedData = req.body.student;
  console.log(studentId, updatedData);

  const result = await StudentServices.updateSingleStudentFromDB(
    studentId,
    updatedData,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is updated successfully',
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.deleteStudentFromDB(studentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is deleted successfully',
    data: result,
  });
});

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
  updateSingleStudent,
};
