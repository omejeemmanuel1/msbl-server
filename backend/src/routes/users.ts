import express from 'express';
import {
  login,
  createUser,
  logout,
  toggleActivation,
  fetchAllUsers,
} from '../controllers/users';
import { isAdmin, isSuperAdmin } from '../middlewares/authorizations';

const router = express.Router();

router.post('/login', login);

router.post('/create-user', createUser);

router.post('/create-admin', createUser);

router.post('/update/:id', isAdmin, toggleActivation);

router.get('/fetch-all', fetchAllUsers);

router.post('/logout', logout);

export default router;
