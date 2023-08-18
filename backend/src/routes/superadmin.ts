import express from 'express';
import { SuperAdminLogin,createAdmin } from '../controllers/authController'
import {Auth} from '../middlewares/auth'
const router = express.Router();

router.post("/login",SuperAdminLogin);
router.post("/create-admin",Auth,createAdmin)

export default router;