// controllers/eventController.js

import Event from '../models/Event.js';

// Получение всех событий
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ eventDate: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Создание нового события
export const createEvent = async (req, res) => {
  const event = new Event(req.body);
  try {
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
