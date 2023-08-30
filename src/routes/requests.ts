import express from 'express';
import {
  createRequest,
  updateRequest,
  searchRequest,
  approveRequest,
  declineRequest,
  fetchRequestbyID,
  fetchAllRequests,
  addComment,
  exportRequests,
  editComment,
} from '../controllers/requests';
import { isUser, isInitiator } from '../middlewares/authorizations';

const router = express.Router();

router.post('/create', isUser, isInitiator, createRequest);

router.post('/update/:id', isUser, isInitiator, updateRequest);

router.post('/approve/:id', isUser, approveRequest);

router.post('/decline/:id', isUser, declineRequest);

router.get('/search', isUser, searchRequest);

router.get('/fetch/:id', isUser, fetchRequestbyID);

router.get('/fetch-all', isUser, fetchAllRequests);

router.post('/add-comment/:id', isUser, addComment);

router.patch('/edit-comment/:id', isUser, editComment);

router.get('/export-requests', isUser, exportRequests);

export default router;
