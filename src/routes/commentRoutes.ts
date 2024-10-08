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
import authMiddleware, { isAdmin } from '../middleware/authMiddleware';

const commentRouter = express.Router();

commentRouter.get('/:blogPostId', getComments);
commentRouter.post('/', createComment);
commentRouter.get('/all', authMiddleware, isAdmin, getAllComments);
commentRouter.put('/:id/approve', authMiddleware, isAdmin, approveComment);
commentRouter.put('/:id/disapprove', authMiddleware, isAdmin, disapproveComment);
commentRouter.delete('/:id', authMiddleware, isAdmin, deleteComment);

export default commentRouter;