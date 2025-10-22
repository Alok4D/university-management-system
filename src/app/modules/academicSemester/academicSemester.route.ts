import express from 'express';
import { AcademicSemesterController } from './academicSemester.controller';
import validateRequest from '../../middlwares/validateRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';

const router = express.Router();

router.get(
  '/all-academic-semester',
  AcademicSemesterController.getAllAcademicSemesterController,
);
router.post(
  '/create-academic-semester',
  validateRequest(
    AcademicSemesterValidation.AcademicSemesterZodValidationSchema,
  ),
  AcademicSemesterController.createAcademicSemester,
);

router.get(
  '/:id',
  AcademicSemesterController.getSingleAcademicSemesterController,
);

router.put(
  '/:id',
  validateRequest(
    AcademicSemesterValidation.updateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterController.updateAcademicSemester,
);

export const AcademicSemesterRoutes = router;

// validateRequest(AcademicSemesterValidation.updateAcademicSemesterValidationSchema),
