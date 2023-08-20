import express from 'express';
import {
  changePassword,
  forgotPassword,
  resetPassword,
  verifyOTP,
} from '../controllers/passwords';
import { isUser } from '../middlewares/authorizations';

const router = express.Router();

router.post('/forgot', forgotPassword);

router.post('/verify-otp', isUser, verifyOTP);

router.post('/reset', isUser, resetPassword);

router.post('/change/:id', changePassword);

export default router;
