import express from 'express';
import cors from 'cors';
import { initMongoConnection } from './initMongoConnection.js';
import eventRoutes from './routers/events.js';
import participantRoutes from './routers/participants.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

initMongoConnection();

// API routes
app.use('/api/events', eventRoutes);
app.use('/api/participants', participantRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
