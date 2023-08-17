import express from 'express';
import {
  createRequest,
  updateRequest,
  searchRequest,
  approveRequest,
  declineRequest,
  fetchRequest,
  fetchAllRequests,
} from '../controllers/request';
import { isUser, isInitiator } from '../middlewares/authorizations';

const router = express.Router();

router.post('/create', isInitiator, createRequest);

router.post('/update', isUser, updateRequest);

router.post('/approve/:id', isUser, approveRequest);

router.post('/decline/:id', isUser, declineRequest);

router.get('/search', isUser, searchRequest);

router.get('/:id', fetchRequest);

router.get('/all', fetchAllRequests);

export default router;
