import express from 'express';
import { UserController } from './user.controller';
import { createStudentZodValidationSchema } from '../student/student.validation';
import validateRequest from '../../middlwares/validateRequest';

const router = express.Router();

// /api/v1/users
router.post('/create-student', validateRequest(createStudentZodValidationSchema), UserController.createStudent,
);

export const UserRoutes = router;
