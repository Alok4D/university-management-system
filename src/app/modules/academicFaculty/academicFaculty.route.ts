import express from 'express'
import { academicFacultyController } from './academicFaculty.controller';
import validateRequest from '../../middlwares/validateRequest';
import { academicFacultyValidations } from './academicFaculty.validation';

const router = express.Router();

/// academic-faculites

router.post('/create-academic-faculty',validateRequest(academicFacultyValidations.createAcademicFacultyZodValidation) ,academicFacultyController.createAcadmicFacultyController)

export const AcademicFacultyRoutes = router;