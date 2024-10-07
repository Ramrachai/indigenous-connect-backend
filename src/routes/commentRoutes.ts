// server/src/routes/commentRoutes.ts
import express from 'express';
import {
    getComments,
    createComment,
    approveComment,
    disapproveComment,
    deleteComment,
    getAllComments
} from '../controllers/commentController';
import authMiddleware, { adminMiddleware } from '../middleware/authMiddleware';

const commentRouter = express.Router();

commentRouter.get('/:blogPostId', getComments);
commentRouter.post('/', createComment);
commentRouter.get('/all', authMiddleware, adminMiddleware, getAllComments);
commentRouter.put('/:id/approve', authMiddleware, adminMiddleware, approveComment);
commentRouter.put('/:id/disapprove', authMiddleware, adminMiddleware, disapproveComment);
commentRouter.delete('/:id', authMiddleware, adminMiddleware, deleteComment);

export default commentRouter;