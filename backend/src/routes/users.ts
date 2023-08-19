import express from 'express';
import {
  login,
  createUser,
  logout,
  toggleActivation,
  fetchAllUsers,
  updateUser,
  deleteUser,
} from '../controllers/users';
import { isAdmin, isSuperAdmin } from '../middlewares/authorizations';

const router = express.Router();

router.post('/login', login);

router.post('/create-user', isAdmin, createUser);

router.post('/create-admin', isSuperAdmin, createUser);

router.patch('/update/:id', isAdmin, updateUser);

router.delete('/delete/:id', isAdmin, deleteUser);

router.post('/activate/:id', isAdmin, toggleActivation);

router.get('/fetch-all', isAdmin, fetchAllUsers);

router.post('/logout', logout);

export default router;
