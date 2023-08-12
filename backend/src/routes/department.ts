import express from 'express';
import { createDept } from '../controllers/departmentController';

const router = express.Router();

router.post('/login', createDept);

export default router;
