import express from 'express';
import {
  registerParticipant,
  getAllParticipants,
} from '../controllers/participantController.js';

const router = express.Router();

router.post('/', registerParticipant);
router.get('/', getAllParticipants); // Добавь этот маршрут

export default router;
