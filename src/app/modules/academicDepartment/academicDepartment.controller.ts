import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utlis/catchAsync';
import sendResponse from '../../utlis/sendResponse';
import { academicDepartmentServices } from './academicDepartment.service';

const createAcadmicDepartmentController = catchAsync(async (req, res) => {
  const result = await academicDepartmentServices.createAcademicDepartmentIntoDB(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Academic Department Created Successfuly!',
    data: result,
  });
});

const getAllAcademicDepartmentController = catchAsync(async (req, res) => {
  const result = await academicDepartmentServices.getAllAcademicDepartment();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'All Academic Department',
    data: result,
  });
});

export const academicDepartmentController = {
  createAcadmicDepartmentController,
  getAllAcademicDepartmentController
};
