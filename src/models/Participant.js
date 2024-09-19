import mongoose from 'mongoose';

const participantSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    source: {
      type: String,
      enum: ['Social media', 'Friends', 'Found myself'],
      required: true,
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
  },
  { timestamps: true },
); // Включение временных меток для создания и обновления

const Participant = mongoose.model('Participant', participantSchema);
export default Participant;
