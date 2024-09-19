// controllers/participantController.js

import Participant from '../models/Participant.js';
import Joi from 'joi';

const participantSchema = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  dateOfBirth: Joi.date().iso().required(),
  source: Joi.string()
    .valid('Social media', 'Friends', 'Found myself')
    .required(),
  eventId: Joi.string().required(),
});

export const registerParticipant = async (req, res) => {
  const { fullName, email, dateOfBirth, source, eventId } = req.body;

  // Валидация данных
  const { error } = participantSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    // Проверка, есть ли уже участник с таким же email и eventId
    const existingParticipant = await Participant.findOne({ email, eventId });
    if (existingParticipant) {
      return res
        .status(400)
        .json({ message: 'Participant already registered for this event' });
    }

    const participant = new Participant({
      fullName,
      email,
      dateOfBirth,
      source,
      eventId,
    });

    await participant.save();
    res.status(201).json(participant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Функция для получения участников по eventId
export const getParticipantsByEvent = async (req, res) => {
  const { eventId } = req.params;

  try {
    const participants = await Participant.find({ eventId });
    res.json(participants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
