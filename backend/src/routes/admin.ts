import express from 'express';
import { AdminLogin} from '../controllers/authController'
const router = express.Router();

router.post("/login", AdminLogin);

export default router;