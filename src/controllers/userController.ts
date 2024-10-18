import { Request, Response } from "express";
import User from "../models/User";
import { paginationSchema, updateUserRoleSchema, updateUserStatusSchema } from '../zodValidations/userValidation';
import { sendEmail } from '../utils/sendMail';
import { accountActivatedEmail } from '../utils/emailTemplates/accountActivated';


export const getAllUsers = async (req: Request, res: Response) => {
    try {

        const parsedQuery = {
            ...req.query,
            page: req.query.page ? parseInt(req.query.page as string, 10) : undefined,
            limit: req.query.limit ? parseInt(req.query.limit as string, 10) : undefined
        };
        const query = paginationSchema.parse(parsedQuery);
        const page = query.page || 1;
        const limit = query.limit || 10;
        const search = query.search ? { fullname: new RegExp(query.search, "i") } : {};

        const users = await User.find(search, "_id fullname email role status whatsapp ethnicity avatar")
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .lean()
            .exec();

        const totalUsers = await User.countDocuments(search);

        res.status(200).json({
            users,
            totalUsers,
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

        const loginUrl = process.env.FRONTEND_URL + "/login"

        await sendEmail(user.email, "Account has been activated", accountActivatedEmail(loginUrl, user.avatar))

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
