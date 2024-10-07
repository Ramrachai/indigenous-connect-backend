// src/types/express.d.ts
import mongoose from 'mongoose';
import { Multer } from 'multer';
import { IUser } from './models/User';

declare global {
    namespace Express {
        interface Request {
            user?: IUser
            file?: Express.Multer.File; 
        }
    }
}

export { };
