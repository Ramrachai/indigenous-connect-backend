
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { ROLE, STATUS } from '../models/User';

interface JwtPayload {
  id: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

      // Get user from the token
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === ROLE.ADMIN) {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Admin only.' });
  }
};

export const isModerator = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === ROLE.MODERATOR) {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Moderator only.' });
  }
};

export const isAdminOrModerator = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === ROLE.MODERATOR || req.user.role === ROLE.ADMIN) {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Admin & Moderator only.' });
  }
};


export const isPending = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.status === STATUS.PENDING) {
    res.status(403).json({ message: 'Access denied. Account is still in pending status' });
  } else {
    next();
  }
};



export default authMiddleware;