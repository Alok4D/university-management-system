import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();
// /api/v1/users
router.post('/create-student', UserController.createStudent);

export const UserRoutes = router;
