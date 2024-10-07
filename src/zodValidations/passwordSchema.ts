import { z } from "zod"

export const passwordSchema = z.object({
    password: z.string()
        .min(6, 'Password must be at least 6 characters long')
        .regex(/[a-zA-Z]/, 'Password must contain at least one letter')
        .regex(/\d/, 'Password must contain at least one number'),
})

export type PasswordType = z.infer<typeof passwordSchema>