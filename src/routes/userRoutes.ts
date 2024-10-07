import express from 'express';
import { registerUser, loginUser, getProfile, forgotPassword, resetPassword } from '../controllers/userController';
import authMiddleware from '../middleware/authMiddleware';
import { imageUpload } from '../middleware/multer';

const authRouter = express.Router();

authRouter.post('/register',imageUpload.single('avatar'), registerUser);
authRouter.post('/login', loginUser);
authRouter.get('/profile', authMiddleware, getProfile);
authRouter.post("/forgot-password", forgotPassword)
authRouter.post("/reset-password", resetPassword)

export default authRouter;