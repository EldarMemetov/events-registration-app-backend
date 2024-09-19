// import Participant from '../models/Participant.js';

// export const registerParticipant = async (req, res) => {
//   const { fullName, email, dateOfBirth, source, eventId } = req.body;

//   const participant = new Participant({
//     fullName,
//     email,
//     dateOfBirth,
//     source,
//     eventId,
//   });

//   try {
//     await participant.save();
//     res.status(201).json(participant);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };
import Joi from 'joi';
import Participant from '../models/Participant.js';

// Определение схемы валидации с помощью Joi
const participantSchema = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  dateOfBirth: Joi.date().iso().required(),
  source: Joi.string()
    .valid('Social media', 'Friends', 'Found myself')
    .required(),
  eventId: Joi.string().required(),
});

// Функция регистрации участника с валидацией
export const registerParticipant = async (req, res) => {
  // Получение данных из тела запроса
  const { fullName, email, dateOfBirth, source, eventId } = req.body;

  // Валидация данных
  const { error } = participantSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  // Создание нового участника
  const participant = new Participant({
    fullName,
    email,
    dateOfBirth,
    source,
    eventId,
  });

  try {
    // Сохранение участника в базу данных
    await participant.save();
    res.status(201).json(participant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
