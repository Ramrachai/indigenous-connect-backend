import { Request, Response } from "express";
import User from "../models/User";
import { paginationSchema, updateUserRoleSchema, updateUserStatusSchema } from '../zodValidations/userValidation';


export const getAllUsers = async (req: Request, res: Response) => {
    try {
        // Parse the query with validation
        const query = paginationSchema.parse(req.query);
        const page = query.page || 1;
        const limit = query.limit || 10;
        const search = query.search ? { fullname: new RegExp(query.search, "i") } : {};

        // Execute the query using .lean() and projection
        const users = await User.find(search, "_id fullname email role status whatsapp ethnicity avatar") // Only select necessary fields
            .skip((page - 1) * limit)
            .limit(limit)
            .lean() // Convert to plain JavaScript objects
            .exec();

        // Get total count for pagination
        const totalUsers = await User.countDocuments(search);

        res.status(200).json({
            users,
            totalPages: Math.ceil(totalUsers / limit),
            currentPage: page,
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: "An unknown error occurred" });
        }
    }
};




export const updateUserStatus = async (req: Request, res: Response) => {
  try {
      const userId = req.params.id;
      const { status } = updateUserStatusSchema.parse(req.body);

      const user = await User.findByIdAndUpdate(userId, { status }, { new: true });

      if (!user) return res.status(404).json({ error: "User not found" });

      res.status(200).json({ message: "Status updated successfully", user });
  } catch (error) {
      if (error instanceof Error) {
          res.status(400).json({ error: error.message });
      } else {
          res.status(400).json({ error: "An unknown error occurred" });
      }
  }
};



export const updateUserRole = async (req: Request, res: Response) => {
  try {
      const userId = req.params.id;
      const { role } = updateUserRoleSchema.parse(req.body);

      const user = await User.findByIdAndUpdate(userId, { role }, { new: true });

      if (!user) return res.status(404).json({ error: "User not found" });

      res.status(200).json({ message: "Role updated successfully", user });
  } catch (error) {
      if (error instanceof Error) {
          res.status(400).json({ error: error.message });
      } else {
          res.status(400).json({ error: "An unknown error occurred" });
      }
  }
};



export const deleteUser = async (req: Request, res: Response) => {
  try {
      const userId = req.params.id;

      const user = await User.findByIdAndDelete(userId);

      if (!user) return res.status(404).json({ error: "User not found" });

      res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    if (error instanceof Error) {
        res.status(400).json({ error: error.message });
    } else {
        res.status(400).json({ error: "An unknown error occurred" });
    }
  }
};




export const getUser = async (req: Request, res: Response) => {
  try {
      const userId = req.params.id;

      const user = await User.findById(userId);

      if (!user) return res.status(404).json({ error: "User not found" });

      res.status(200).json(user);
  } catch (error) {
      if (error instanceof Error) {
          res.status(400).json({ error: error.message });
      } else {
          res.status(400).json({ error: "An unknown error occurred" });
      }
  }
};
