import express from 'express';
import {
  forgotPassword,
  resetPassword,
  verifyOTP,
} from '../controllers/passwords';
import { isUser } from '../middlewares/authorizations';

const router = express.Router();

router.post('/forgot', forgotPassword);

router.post('/verify-otp', isUser, verifyOTP);

router.post('/reset', isUser, resetPassword);

export default router;
