import express from 'express';
import { createDept, fetchDepartment } from '../controllers/departments';
import { isAdmin } from '../middlewares/authorizations';

const router = express.Router();

router.post('/create-dept', isAdmin, createDept);

router.get('/all-departments', isAdmin, fetchDepartment);

export default router;
