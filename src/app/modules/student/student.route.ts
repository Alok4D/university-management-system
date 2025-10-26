import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../middlwares/validateRequest';
import { studentValidations } from './student.validation';

const router = express.Router();

// base url:   /api/v1/students

router.get('/', StudentControllers.getAllStudents);
router.get('/:studentId', StudentControllers.getSingleStudent);

router.put(
  '/:studentId',
  validateRequest(studentValidations.updateStudentZodValidationSchema),
  StudentControllers.updateSingleStudent,
);

router.delete('/:studentId', StudentControllers.deleteStudent);

export const StudentRoutes = router;
