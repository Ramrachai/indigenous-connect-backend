import { z } from 'zod';

// Define the schema for email validation
export const emailSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Email is required" })
        .email({ message: "Invalid email address" })
});

export type TEmail = z.infer<typeof emailSchema>