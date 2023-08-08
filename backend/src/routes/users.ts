import express from 'express';
import { login, createUser, logout, toggleActivation, fetchAllUsers } from '../controllers/users';

const router = express.Router();

router.post('/create', createUser);

router.get('/fetch-all', fetchAllUsers);

router.post('/update-status/:id', toggleActivation);

router.post('/login', login);

router.post('/logout', logout);

export default router;
