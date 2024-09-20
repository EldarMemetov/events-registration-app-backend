import express from 'express';
import {
  registerParticipant,
  getAllParticipants,
} from '../controllers/participantController.js';

const router = express.Router();

router.post('/', registerParticipant);
router.get('/', getAllParticipants); 

export default router;
