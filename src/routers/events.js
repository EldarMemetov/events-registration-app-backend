// import express from 'express';
// import { getAllEvents, createEvent } from '../controllers/eventController.js';

// const router = express.Router();

// // Get all events
// router.get('/', getAllEvents);

// // Create a new event
// router.post('/', createEvent);

// export default router;
import express from 'express';
import Event from '../models/Event.js';

const router = express.Router();

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

export default router;
