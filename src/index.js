import express from 'express';
import cors from 'cors';
import { initMongoConnection } from './initMongoConnection.js';
import eventRoutes from './routers/events.js';
import participantRoutes from './routers/participants.js';
import { env } from './utils/env.js';

const app = express();
const PORT = env('PORT');

app.use(cors());
app.use(express.json());

initMongoConnection();

app.use('/api/events', eventRoutes);
app.use('/api/participants', participantRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
