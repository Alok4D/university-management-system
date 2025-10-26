import express from 'express'
import validateRequest from '../../middlwares/validateRequest';
import { academicDepartmentValidations } from './academicDepartment.validation';
import { academicDepartmentController } from './academicDepartment.controller';


const router = express.Router();

// academic-department/create-academic-department

router.post('/create-academic-department',validateRequest(academicDepartmentValidations.createAcademicDepartmentZodValidation), academicDepartmentController.createAcadmicDepartmentController);

router.get('/', academicDepartmentController.getAllAcademicDepartmentController);

export const AcademicDepartmentRoutes = router;