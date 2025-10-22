import httpStatus from 'http-status';
import catchAsync from '../../utlis/catchAsync';
import sendResponse from '../../utlis/sendResponse';
import { AcademicSemesterServices } from './academicSemester.services';
import { TAcademicSemester } from './academicSemester.interface';

const getAllAcademicSemesterController = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAllAcademicSemester();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester is created successfully',
    data: result,
  });
});

const getSingleAcademicSemesterController = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AcademicSemesterServices.getSingleAcademicSemester(id);

  if (!result) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: 'Semester not found',
      data: null,
    });
  }
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Semester retrieved successfully',
    data: result,
  });
});

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester is created successfully',
    data: result,
  });
});

const updateAcademicSemester = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload: Partial<TAcademicSemester> = req.body;

  const result = await AcademicSemesterServices.updateAcademicSemesterIntoDB(
    id,
    payload,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester updated successfully',
    data: result,
  });
});

export const AcademicSemesterController = {
  createAcademicSemester,
  getAllAcademicSemesterController,
  getSingleAcademicSemesterController,
  updateAcademicSemester,
};
