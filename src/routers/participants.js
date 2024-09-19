import express from 'express';
import {
  registerParticipant,
  getParticipantsByEvent,
} from '../controllers/participantController.js';
import Participant from '../models/Participant.js';

const router = express.Router();

// Регистрация участника
router.post('/', registerParticipant);

// Получение участников по eventId
router.get('/:eventId', getParticipantsByEvent);

// Получение всех участников с фильтрацией
router.get('/', async (req, res) => {
  const { name, email } = req.query;
  const filter = {};

  if (name) filter.fullName = new RegExp(name, 'i');
  if (email) filter.email = email;

  try {
    const participants = await Participant.find(filter);
    res.json(participants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Получение статистики по участникам
router.get('/daily-stats', async (req, res) => {
  try {
    const stats = await Participant.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
