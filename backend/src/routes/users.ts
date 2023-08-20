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
import { isAdmin, isSuperAdmin, isUser } from '../middlewares/authorizations';

const router = express.Router();

router.post('/login', login);

router.post('/create-user', isUser, isAdmin, createUser);

router.post('/create-admin', isUser, isSuperAdmin, createUser);

router.patch('/update/:id', isUser, isAdmin, updateUser);

router.delete('/delete/:id', isUser, isAdmin, deleteUser);

router.post('/activate/:id', isUser, isAdmin, toggleActivation);

router.get('/fetch-all', isUser, isAdmin, fetchAllUsers);

router.post('/logout', logout);

export default router;
