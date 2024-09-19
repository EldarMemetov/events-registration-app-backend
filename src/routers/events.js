import express from 'express';
import Event from '../models/Event.js';
import { getAllEvents, createEvent } from '../controllers/eventController.js';

const router = express.Router();

// Получение всех событий с параметрами для пагинации и сортировки
router.get('/', async (req, res) => {
  const { page = 1, limit = 10, sortBy = 'title', order = 'asc' } = req.query;
  const sortOptions = {};
  const skip = (page - 1) * limit;

  switch (sortBy) {
    case 'date':
      sortOptions.eventDate = order;
      break;
    case 'organizer':
      sortOptions.organizer = order;
      break;
    default:
      sortOptions.title = order;
  }

  try {
    const events = await Event.find()
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit));
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Получение всех событий (используется из контроллера)
router.get('/all', getAllEvents);

// Создание нового события (используется из контроллера)
router.post('/', createEvent);

export default router;
