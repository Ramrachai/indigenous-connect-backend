import { z } from "zod"

export const whatsappSchema = z.object({
    whatsapp: z.string()
        .regex(/^\d+$/, 'WhatsApp number must only contain digits')
        .min(6, 'WhatsApp number must be at least 6 digits long')
        .max(15, 'WhatsApp number can be at most 15 digits long')
        .optional(),
})

export type WhatsappType = z.infer<typeof whatsappSchema>