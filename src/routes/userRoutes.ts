import express from "express";
import { getAllUsers, updateUserStatus, updateUserRole, deleteUser, getUser } from '../controllers/userController';

const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUser);
userRouter.put("/:id/status", updateUserStatus);
userRouter.put("/:id/role", updateUserRole);
userRouter.delete("/:id", deleteUser);

export default userRouter;
