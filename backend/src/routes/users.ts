import express from 'express';
import {
  login,
  createUser,
  logout,
  toggleActivation,
  fetchAllUsers,
  fetchSingleUser,
} from '../controllers/users';
import { isAdmin } from '../middlewares/authorizations';

const router = express.Router();

router.post('/login', login);

router.post('/create-user', isAdmin, createUser);

router.post('/create-admin', isSuperAdmin, createUser);

router.post('/update/:id', isAdmin, toggleActivation);

router.get('/fetch-all', isAdmin, fetchAllUsers);

router.get('/fetchSingleUser/:userId', fetchSingleUser);

router.post('/logout', logout);

export default router;
