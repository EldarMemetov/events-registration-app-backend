// import express from 'express';
// import { registerParticipant } from '../controllers/participantController.js';

// const router = express.Router();

// router.post('/', registerParticipant);

// export default router;

import express from 'express';
import { registerParticipant } from '../controllers/participantController.js';
import Participant from '../models/Participant.js';

const router = express.Router();

router.post('/', registerParticipant);

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
