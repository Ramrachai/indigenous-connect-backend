// server/src/routes/projectRoutes.ts
import express from 'express';
import { getEvents, createEvent, deleteEvent, updateEvent } from '../controllers/eventController';
import authMiddleware from '../middleware/authMiddleware';

const eventtRouter = express.Router();

eventtRouter.get('/', getEvents);
eventtRouter.post('/', authMiddleware, createEvent);
eventtRouter.put('/:id', authMiddleware, updateEvent);
eventtRouter.delete('/:id', authMiddleware, deleteEvent);

export default eventtRouter;
