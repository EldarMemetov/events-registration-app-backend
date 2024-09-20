import express from 'express';
import {
  registerParticipant,
  getAllParticipants,
  getParticipantsByEventId,
} from '../controllers/participantController.js';

const router = express.Router();

router.post('/', registerParticipant);
router.get('/', getAllParticipants);
router.get('/:eventId', getParticipantsByEventId);

export default router;
