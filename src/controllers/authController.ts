// server/src/controllers/authController.ts
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser, ROLE, STATUS } from '../models/User';
import crypto from 'crypto'
import { emailSchema } from '../zodValidations/emailSchema';
import { sendEmail } from '../utils/sendMail';
import { passwordReset } from '../utils/emailTemplates/passwordReset';
import { registerSchema } from '../zodValidations/registerSchema';
import { uploadToS3 } from '../config/awsS3Config';
import { welcomeEmail } from '../utils/emailTemplates/welcome';

const generateToken = (id: string, role: string) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET as string, {
    expiresIn: '30d',
  });
};

export const registerUser = async (req: Request, res: Response) => {
  console.log("--register route --", req.body)
  try {
    const validatedData = registerSchema.parse(req.body);
    const { fullname, email, password, role, whatsapp , ethnicity } = validatedData;
    const file = req.file as Express.Multer.File
    console.log("===afile ===", file)

    let avatarUrl = ""

    if (file) {
      const folder = 'users'
      const { fileUrl } = await uploadToS3(file, folder)
      avatarUrl = fileUrl
    } else {
      avatarUrl = "https://indigenous-connect.s3.ap-south-1.amazonaws.com/person.png"
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user: IUser = await User.create({ fullname, email, password, role, whatsapp, avatar: avatarUrl, ethnicity });

    await sendEmail(user.email, "Welcome to indigenous connect", welcomeEmail(user.fullname))

    res.status(201).json({
      _id: user._id,
      username: user.fullname,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    res.status(400).json({ message: 'Error registering user', error });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  console.log("--login route hit --", req.body)
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
      res.json({
        id: user._id,
        fullane: user.fullname,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        whatsapp: user.whatsapp,
        token: generateToken(user._id, user.role),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error logging in', error });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user profile', error });
  }
};


export const forgotPassword = async (req: Request, res: Response) => {
  const validatedData = emailSchema.safeParse(req.body);
  if (!validatedData.success) {
    return res.status(400).json({ message: validatedData.error.errors[0].message });
  }

  const { email } = validatedData.data;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const fiveMinutes = 1 * 60 * 1000; // 1 minutes in milliseconds
    const timeNow = Date.now();

    // if (user.updatedAt && (timeNow - user.updatedAt.getTime()) < fiveMinutes) {
    //   return res.status(429).json({ message: 'Password reset request already made. Please wait 5 minutes before trying again.' });
    // }

    const resetToken = crypto.randomBytes(20).toString('hex');

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = new Date(timeNow + 10 * 60 * 1000); // Token expires in 10 minutes

    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    await sendEmail(user.email, 'Password Reset Request', passwordReset(resetUrl))

    res.status(200).json({ message: 'Reset password email sent' });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error in forgotPassword:', error.message);
      res.status(500).json({ message: 'Error sending reset email', error: error.message });
    } else {
      console.error('Unexpected error in forgotPassword:', error);
      res.status(500).json({ message: 'Unexpected error occurred' });
    }
  }
};



export const resetPassword = async (req: Request, res: Response) => {
  const { password, token } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: new Date() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    user.password = password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    const newToken = generateToken(user._id, user.role);

    res.status(200).json({
      message: 'Password reset successful',
      token: newToken,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error resetting password', error });
  }
};




