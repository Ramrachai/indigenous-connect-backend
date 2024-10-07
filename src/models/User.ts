import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export enum STATUS {
  ACTIVE = "active",
  INACTIVE = "inactive",
  PENDING = "pending", 
  SUSPENDED = "suspended",
}

export enum ROLE {
  USER = "user",
  MODERATOR = "moderator",
  ADMIN = "admin",
}

export interface IUser extends Document {
  fullname: string;
  email: string;
  password: string;
  role: ROLE; 
  whatsapp?: string; 
  avatar?: string; 
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  status: STATUS; 
  ethnicity?: string; 
  comparePassword(candidatePassword: string): Promise<boolean>;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: Object.values(ROLE), default: ROLE.USER }, 
  status: { type: String, enum: Object.values(STATUS), default: STATUS.PENDING },
  whatsapp: { type: String, required: false }, 
  avatar: { type: String, required: false }, 
  ethnicity: { type: String, required: false }, 
  resetPasswordToken: String,
  resetPasswordExpires: Date,
}, { timestamps: true });

UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', UserSchema);
