import express from 'express';
import {
  createDept,
  fetchDepartment,
} from '../controllers/departmentController';

const router = express.Router();

router.post('/create-dept', createDept);
router.get('/all-departments', fetchDepartment);

export default router;
