import { Request, Response } from 'express';
import catchAsync from '../../utlis/catchAsync';

const createSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {},
);

const getAllSemesterRegistrations = catchAsync(
  async (req: Request, res: Response) => {},
);

const getSingleSemesterRegistrations = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
  },
);

const updateSemesterRegistrations = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
  },
);

export const SemesterRegistrationController = {
  createSemesterRegistration,
  getAllSemesterRegistrations,
  getSingleSemesterRegistrations,
  updateSemesterRegistrations
};
