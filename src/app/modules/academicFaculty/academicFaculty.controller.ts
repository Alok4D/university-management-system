import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utlis/catchAsync';
import sendResponse from '../../utlis/sendResponse';
import { academicFacultyServices } from './academicFaculty.service';

const createAcadmicFacultyController = catchAsync(async (req, res) => {
  const result = await academicFacultyServices.createAcademicFacultyIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Academic Faculty Created Successfuly!',
    data: result,
  });
});

export const academicFacultyController = {
  createAcadmicFacultyController,
};
