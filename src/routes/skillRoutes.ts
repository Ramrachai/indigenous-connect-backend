
// server/src/routes/skillRoutes.ts
import express from 'express';
import { getSkills, createSkill, updateSkill, deleteSkill } from '../controllers/skillController';
import authMiddleware from '../middleware/authMiddleware';

const skillRouter = express.Router();

skillRouter.get('/', getSkills);
skillRouter.post('/', authMiddleware, createSkill);
skillRouter.put('/:id', authMiddleware, updateSkill);
skillRouter.delete('/:id', authMiddleware, deleteSkill);

export default skillRouter;

