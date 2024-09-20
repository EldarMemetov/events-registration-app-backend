import Joi from 'joi';
import Participant from '../models/Participant.js';

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
  const { error } = participantSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { fullName, email, eventId } = req.body;

  try {
    const existingParticipant = await Participant.findOne({ email, eventId });
    if (existingParticipant) {
      return res.status(400).json({
        message: `Participant ${fullName} with email ${email} is already registered for this event.`,
      });
    }

    const participant = new Participant(req.body);
    await participant.save();
    res.status(201).json(participant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllParticipants = async (req, res) => {
  try {
    const participants = await Participant.find().populate('eventId');
    res.json(participants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getParticipantsByEventId = async (req, res) => {
  const { eventId } = req.params;

  try {
    const participants = await Participant.find({ eventId }).populate(
      'eventId',
    );
    res.json(participants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
