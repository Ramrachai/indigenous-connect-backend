import { z } from "zod";
import { ROLE } from "../models/User";
import { emailSchema } from "./emailSchema";
import { passwordSchema } from "./passwordSchema";
import { whatsappSchema } from "./whatsappSchema";

export const registerSchema = z.object({
    fullname: z.string().min(3, 'Fullname must be at least 3 characters long').max(30),
    email: emailSchema.shape.email,
    password: passwordSchema.shape.password, 
    whatsapp: whatsappSchema.shape.whatsapp,
    ethnicity: z.string().optional(),
    avatar: z.string().optional(), 
    role: z.nativeEnum(ROLE).optional(),
});


export type RegisterType = z.infer<typeof registerSchema>

