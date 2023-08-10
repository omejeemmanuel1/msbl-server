import express from 'express';
import {
  login,
  createUser,
  logout,
  toggleActivation,
  fetchAllUsers,
} from '../controllers/users';

const router = express.Router();

router.post('/login', login);

router.post('/create', createUser);

router.post('/update/:id', toggleActivation);

router.get('/fetch-all', fetchAllUsers);

router.post('/logout', logout);

export default router;
