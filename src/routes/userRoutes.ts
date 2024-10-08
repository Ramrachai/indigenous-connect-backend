import express from "express";
import { getAllUsers, updateUserStatus, updateUserRole, deleteUser, getUser } from '../controllers/userController';
import authMiddleware, { isAdmin, isAdminOrModerator } from "../middleware/authMiddleware";

const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUser);
userRouter.put("/:id/status", authMiddleware, isAdminOrModerator, updateUserStatus);
userRouter.put("/:id/role",authMiddleware, isAdmin, updateUserRole);
userRouter.delete("/:id", authMiddleware, isAdmin, deleteUser);

export default userRouter;
