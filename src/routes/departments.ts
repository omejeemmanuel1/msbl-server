import express from 'express';
import { createDept, fetchDepartment } from '../controllers/departments';
import { isUser } from '../middlewares/authorizations';

const router = express.Router();

router.post('/create-dept', isUser, createDept);

router.get('/all-departments', isUser, fetchDepartment);

export default router;
