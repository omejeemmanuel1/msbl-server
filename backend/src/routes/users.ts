import express from 'express';
import { login, createUser, logout } from '../controllers/users';

const router = express.Router();

router.post('/create-users', createUser);

router.post('/login', login);

router.post('/logout', logout);

export default router;
