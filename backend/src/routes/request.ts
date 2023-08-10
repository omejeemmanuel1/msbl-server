import express from 'express';
import {
  createRequest,
  searchRequest,
  approveRequest,
  declineRequest,
  fetchRequest,
  fetchAllRequests,
} from '../controllers/request';

const router = express.Router();

router.post('/create', createRequest);

router.get('/search', searchRequest);

router.post('/approve/:id', approveRequest);

router.post('/decline/:id', declineRequest);

router.get('/:id', fetchRequest);

router.get('/all', fetchAllRequests);

export default router;
