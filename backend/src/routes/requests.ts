import express from 'express';
import {
  createRequest,
  updateRequest,
  searchRequest,
  approveRequest,
  declineRequest,
  fetchRequest,
  fetchAllRequests,
  exportRequests,
} from '../controllers/request';
import { isUser, isInitiator } from '../middlewares/authorizations';

const router = express.Router();

router.post('/create', isInitiator, createRequest);

router.post('/update/:id', isUser, updateRequest);

router.post('/approve/:id', isUser, approveRequest);

router.post('/decline/:id', isUser, declineRequest);

router.get('/search', isUser, searchRequest);

router.get('/fetch/:id', isUser, fetchRequest);

router.get('/fetch-all', isUser, fetchAllRequests);

router.get('/export-requests', exportRequests);

export default router;
